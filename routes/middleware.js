/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
const _ = require('lodash')
const keystone = require('keystone')

const BUNDLE_PATH = (process.env.NODE_ENV === 'development') ? '' : '/js/dist'

/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {

	res.locals.user = req.user

  res.locals.BUNDLE_PATH = BUNDLE_PATH

	next()
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = (req, res, next) => {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.')
		res.redirect('/signin')
	} else {
		next()
	}
};

exports.requireApiUser = (req, res, next) => {
	if (!req.user) {
		res.status(403).jsonp({
      error: 'You are not logged in',
      success: false,
      data: {}
    })
	} else {
		next()
	}
};

exports.signout = (req, res, next) => {
  if(!req.user){
    next()
  }
  else {
    keystone.session.signout(req, res, () => {
      req.flash('success', 'You have been logged out.')
      next()
    })
  }
}
