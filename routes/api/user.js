const keystone = require('keystone')

let getLoggedInUser = (req, res, next) => {
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
