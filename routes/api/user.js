const keystone = require('keystone')

let getLoggedInUser = (req, res, next) => {

  if(!req.user) {
    return res.status(404).jsonp({
      error:   'You are not logged.',
      success: false,
      data: {}
    })
  }

  keystone.list('User').model.findOne({_id: req.user.id})
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


exports = module.exports =  {
  getLoggedInUser
}
