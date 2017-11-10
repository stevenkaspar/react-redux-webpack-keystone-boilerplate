const keystone = require('keystone');

let reset_password = (req, res) => {
  const {
    password,
    hash
  } = req.body

  if (!password || !hash) {
    return res.status(400).jsonp({
      error:  'Missing information',
      success: false,
      data:   {}
    })
  }

  keystone.list('User').model.findOne({ reset_password_hash: hash }).exec((err, user) => {

    if (err || !user) {
      return res.status(400).jsonp({
        error:  'No user found',
        success: false,
        data:   {}
      })
    }

    user.password = password
    user.reset_password_hash = ''

    user.save(err => {
      if(err){
        return res.status(500).jsonp({
          error:  err.message,
          success: false,
          data:   {}
        })
      }
      keystone.session.signin({ email: user.email, password: password }, req, res, (user) => {

        return res.jsonp({
          error:  '',
          success: true,
          data:   {}
        })

      }, function(err) {

        return res.status(400).jsonp({
          error:  'Password does not match',
          success: false,
          data:   {}
        })

      });
    })



  });
}


exports = module.exports =  reset_password
