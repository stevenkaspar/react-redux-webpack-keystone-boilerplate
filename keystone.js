// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config({
  path: __dirname+'/.env'
});

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'keystone-template',
	'brand': 'keystone-template',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',

	'emails': 'templates/emails',

	'auto update': true,
	'session': true,
  'session store': process.env.SESSION_STORE || 'mongo',
	'auth': true,
	'user model': 'User',
  'cookie secret': process.env.COOKIE_SECRET || 'SOjsda823thpp9asv89ahfiag8r79aenpg',
	'mongo': process.env.RWKB_MONGO_URI || "mongodb://localhost/react-redux-keystone-boilerplate",
  'auto update': process.env.TESTING !== 'true'
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	enquiries: 'enquiries',
	users: 'users',
	documents: 'documents',
});

// Start Keystone to connect to your database and initialise the web server


if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
	console.log('----------------------------------------'
	+ '\nWARNING: MISSING MAILGUN CREDENTIALS'
	+ '\n----------------------------------------'
	+ '\nYou have opted into email sending but have not provided'
	+ '\nmailgun credentials. Attempts to send will fail.'
	+ '\n\nCreate a mailgun account and add the credentials to the .env file to'
	+ '\nset up your mailgun integration');
}



if(process.env.USE_KEYSTONE_SERVER === 'true'){
	keystone.start();
}
else if(process.env.TESTING !== 'true') {
	console.log(`
	/**
	 * STARTING
	 *
	 * keystone.openDatabaseConnection();
	 *
	 */
	`);
	keystone.openDatabaseConnection();
	console.log(`
	/**
	 * STARTING
	 *
	 * keystone.initExpressApp();
	 *
	 */
	`);
	keystone.initExpressApp();
	console.log(`
	/**
	 * EXPORTING
	 *
	 * module.exports = keystone;
	 *
	 */
	`);

	console.log(`
	/**
	 * env=${keystone.get('env')}
	 */
	`);
}

module.exports = keystone;
