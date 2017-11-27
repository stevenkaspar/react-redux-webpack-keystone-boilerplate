const keystone = require('keystone')

let getLoggedInUsers = async (req, res, next) => {
  return await keystone.list('Document').model.find({
    users: req.user.id
  }).populate('investment')
}

exports = module.exports =  {
  getLoggedInUsers
}
