const keystone = require('keystone')
const User     = keystone.list('User')

let getLoggedInUser = async (req, res, next) => {
  if(!req.user) return {}
  return await User.model.findById(req.user.id)
}


exports = module.exports =  {
  getLoggedInUser
}
