const keystone = require('keystone')
const render = require('./render')
const User = keystone.list('User')
const services = require('../services')

let handleRequest = async (req, res, next) => {
  // state will be the initial state used by the react app
  // it should most likely mirror the structure of the reducers
  let state = {
    user: {
      user: await services.user.getLoggedInUser(req, res, next)
    },
    users: {
      items: await services.users.get(req, res, next)
    }
  }
  // call the render function which will actually call next so that our
  // css, html, and js can be set and passed to a pug template
  render(state, req, res, next)
}

module.exports = handleRequest
