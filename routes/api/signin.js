const keystone = require('keystone');

let signin = (req, res) => {
  const {
    email,
    password
  } = req.body

  if (!email || !password) {
    return res.status(400).jsonp({
      error:  'Need both email and password',
      success: false,
      data:   {}
    })
  }

  keystone.list('User').model.findOne({ email: email, active: true }).exec((err, user) => {

    if (err || !user) {
      return res.status(400).jsonp({
        error:  'No user found with that email',
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

  });
}


exports = module.exports =  signin
