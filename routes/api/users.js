const services = require('../services')

const { authErrResponse, errResponse, successResponse } = require('./helpers')

let getOne = async (req, res, next) => {
  try {
    let user = await services.users.getOne(req, res, next)
    successResponse({res, data: {user}})
  }
  catch(err){
    errResponse({res, err})
  }
}

let get = async (req, res, next) => {
  try {
    let users = await services.users.get(req, res, next)
    successResponse({res, data: {users}})
  }
  catch(err){
    errResponse({res, err})
  }
}

let create = async (req, res, next) => {
  try {
    let user = await services.users.create(req, res, next)
    successResponse({res, data: {user}})
  }
  catch(err){
    errResponse({res, err})
  }
}

let update = async (req, res, next) => {
  try {
    let user = await services.users.update(req, res, next)
    successResponse({res, data: {user}})
  }
  catch(err){
    errResponse({res, err})
  }
}

let resetPassword = async (req, res, next) => {
  try {
    let user = await services.users.resetPassword(req, res, next)
    successResponse({res, data: {user}})
  }
  catch(err){
    errResponse({res, err})
  }
}

exports = module.exports =  {
  get,
  create,
  update,
  resetPassword
}
