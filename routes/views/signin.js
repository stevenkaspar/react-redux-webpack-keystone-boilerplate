const keystone = require('keystone');

exports = module.exports = function (req, res, next) {

  if(req.user){
    return res.redirect('/app')
  }

	const view = new keystone.View(req, res);
	let locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'signin';

	// Render the view
	view.render('signin');
};
