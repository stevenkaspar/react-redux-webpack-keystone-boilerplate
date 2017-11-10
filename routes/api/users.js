const keystone = require('keystone')
const User     = keystone.list('User')
const randomstring = require('randomstring')

let getOne = (req, res, next) => {
  User.model.findOne({_id: req.params.user_id})
    .exec((err, user) => {
    if(err){
      return res.status(500).jsonp({
        error: err.message,
        success: false,
        data: {}
      })
    }
    res.jsonp({
      error:  '',
      success: true,
      data: {
        user
      }
    })
  })
}

let get = (req, res, next) => {
  if(req.user.isAdmin){
    User.model.find({is_investor: true})
      .exec((err, users) => {
      if(err){
        return res.status(500).jsonp({
          error: err.message,
          success: false,
          data: {}
        })
      }
      res.jsonp({
        error:  '',
        success: true,
        data: {
          users
        }
      })
    })
  }
  else {
    return res.jsonp({
      error: '',
      success: true,
      data: {
        users: []
      }
    })
  }
}

let create = (req, res, next) => {

  if(!userCanCreate(req)){
    return res.status(500).jsonp({
      error:  'What are you trying to do?',
      success: false,
      data: {}
    })
  }

  let new_user = new User.model({
    name:      {
      first: req.body.name.first,
      last:  req.body.name.last
    },
    email:    req.body.email,
    password: req.body.password,
    active:   req.body.active === 'true'
  })

  new_user.save(err => {
    if(err){
      return res.status(500).jsonp({
        error: err.message,
        success: false,
        data: {}
      })
    }
    res.jsonp({
      error:  '',
      success: true,
      data: {
        user: new_user
      }
    })
  })
}

let update = (req, res, next) => {
  if(!userCanUpdate(req)){
    return res.status(500).jsonp({
      error:  'What are you trying to do?',
      success: false,
      data: {}
    })
  }
  User.model.findOne({
    _id: req.params.user_id
  }).exec((err, user) => {
    if(err){
      return res.status(500).jsonp({
        error: err.message,
        success: false,
        data: {}
      })
    }

    user.name.first = req.body.name.first
    user.name.last  = req.body.name.last
    user.email      = req.body.email
    user.active     = req.body.active === 'true'

    if(req.body.password && req.body.password.length > 0){
      user.password = req.body.password
    }

    user.save(err => {
      if(err){
        return res.status(500).jsonp({
          error: err.message,
          success: false,
          data: {}
        })
      }

      getOne(req, res, next)
    })
  })
}

let resetPassword = (req, res, next) => {
  const hash = randomstring.generate({
    length: 256,
    charset: 'alphabetic'
  })

  const reset_url = `http://${process.env.BASE_URL}/reset-password/${hash}`
  
  User.model.findOne({
    email: req.query.email
  }).exec((err, user) => {
    if(err){
      return res.status(500).jsonp({
        error: err.message,
        success: false,
        data: {}
      })
    }

    user.reset_password_hash = hash

    user.save(err => {
      if(err){
        return res.status(500).jsonp({
          error: err.message,
          success: false,
          data: {}
        })
      }
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
          return res.status(500).jsonp({
            error: err.message,
            success: false,
            data: {}
          })
        }
        res.jsonp({
          error:   '',
          success: true,
          data: {
            success: true
          }
        })
      })
    })
  })
}

exports = module.exports =  {
  get,
  create,
  update,
  resetPassword
}

let userCanUpdate = req => {
  return (req.user.isAdmin || req.user.id === req.params.user_id)
}
let userCanCreate = req => {
  return (req.user.isAdmin)
}
