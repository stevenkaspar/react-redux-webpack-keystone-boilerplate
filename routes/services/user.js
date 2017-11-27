const keystone = require('keystone')
const User     = keystone.list('User')

let getLoggedInUser = async (req, res, next) => {
  return await User.model.findById(req.user.id)
}


exports = module.exports =  {
  getLoggedInUser
}
