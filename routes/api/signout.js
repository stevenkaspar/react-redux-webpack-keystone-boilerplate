const keystone = require(process.env.KEYSTONE_PATH || 'keystone');

let signout = (req, res) => {
  if(!req.user){
    return res.status(404).jsonp({
      error:   'Not logged in',
      success: false,
      data:    {}
    })
  }

  keystone.session.signout(req, res, () => {
    res.jsonp({
      error:   '',
      success: true,
      data:    {}
    })
  })
}


exports = module.exports =  signout
