/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
const routes = {
	views: importRoutes('./views'),
  api:   importRoutes('./api')
}

const reduxRender = require('./redux-render')

// Setup Route Bindings
exports = module.exports = (app) => {

  if(process.env.NODE_ENV === 'development'){
    const webpack        = require('webpack')
    const webpack_config = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : '../webpack.config')
    const compiler       = webpack(webpack_config)

    // Step 2: Attach the dev middleware to the compiler & the server
    app.use(require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: webpack_config.output.publicPath
    }))

    // Step 3: Attach the hot middleware to the compiler & the server
    app.use(require("webpack-hot-middleware")(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000
    }))
  }

  app.use('/app', reduxRender)

  app.get('/signin',  routes.views.signin)
  app.get('/signout', middleware.signout, routes.views.signin)
	app.get('/reset-password/:hash', routes.views.reset_password)

  app.all('/api/signin', routes.api.signin, routes.views.signin)
  app.all('/api/signout', routes.api.signout, routes.views.signin)
  app.all('/api/reset-password', routes.api.reset_password, routes.views.signin)
  app.post('/api/users/reset_password', routes.api.users.resetPassword)

  // NOTE: To protect a route you can uncomment these
  // app.all('*', middleware.requireUser)
  // app.all('/api*', middleware.requireApiUser)

  app.all('/', (req, res, next) => res.redirect('/app'))

	app.get('/app*', routes.views.index)
	app.get('/blog/:category?', routes.views.blog)
	app.get('/blog/post/:post', routes.views.post)
	app.all('/contact', routes.views.contact)

  app.get('/api/documents',     routes.api.documents.getLoggedInUsers)
  app.get('/api/documents/:document_id',     routes.api.documents.getDocumentsFileContents)

  app.get('/api/user',     routes.api.user.getLoggedInUser)

  app.get('/api/users',     routes.api.users.get)
  app.post('/api/users',     routes.api.users.create)
  app.put('/api/users/:user_id',     routes.api.users.update)

};
