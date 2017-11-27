const keystone = require('keystone')
const User     = keystone.list('User')
const randomstring = require('randomstring')

let getOne = async (req, res, next) => {
  return await User.model.findById(req.params.user_id)
}

let get = async (req, res, next) => {
  return await User.model.find({})
}

let create = async (req, res, next) => {

  let new_user = new User.model({
    name:      {
      first: req.body.name.first,
      last:  req.body.name.last
    },
    email:    req.body.email,
    password: req.body.password,
    active:   req.body.active,
    is_admin:  req.body.is_admin && process.env.TESTING === 'true',
  })

  await new_user.save()

  return new_user
}

let update = async (req, res, next) => {
  if(!userCanUpdate(req)){
    return new Error('What are you trying to do?')
  }
  let user = await User.model.findById(req.params.user_id)

  user.name.first = req.body.name.first
  user.name.last  = req.body.name.last
  user.email      = req.body.email
  user.active     = req.body.active === 'true'

  if(req.body.password && req.body.password.length > 0){
    user.password = req.body.password
  }

  await user.save()

  return await getOne(req, res, next)
}

let resetPassword = async (req, res, next) => {
  const hash = randomstring.generate({
    length: 256,
    charset: 'alphabetic'
  })

  const reset_url = `http://${process.env.BASE_URL}/reset-password/${hash}`

  let user = await User.model.findOne({ email: req.query.email })

  user.reset_password_hash = hash

  await user.save()

  let success = await new Promise((resolve, reject) => {
    new keystone.Email({
  		templateName: 'reset-password',
  		transport: 'mailgun',
  	}).send({
  		to: user.email,
  		from: {
  			name: 'Fusion Hospitality',
  			email: 'support@fusion-hospitality.com',
  		},
  		subject: 'Your Password Reset Link',
  		hash,
      reset_url
  	}, (err) => {
      if(err){
        return reject(err.message)
      }
      resolve(true)
    })
  })

  return success
}

exports = module.exports =  {
  get,
  create,
  update,
  resetPassword
}

let userCanUpdate = req => {
  return (req.user.is_admin || req.user.id === req.params.user_id)
}
// let userCanCreate = req => {
//   return (req.user.is_admin)
// }
