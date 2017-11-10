const keystone = require('keystone');
const User     = keystone.list('User')

exports = module.exports = function (req, res, next) {

  const hash = req.params.hash

  if(req.user){
    return res.redirect('/app')
  }
  else if(!hash){
    return res.redirect('/signin')
  }

  User.model.findOne({reset_password_hash: hash})
    .exec((err, user) => {
      if(err){
        return res.redirect('/signin')
      }

    	const view = new keystone.View(req, res);
    	let locals = res.locals;

    	// locals.section is used to set the currently selected
    	// item in the header navigation.
    	locals.section = 'reset_password';

    	// Render the view
    	view.render('reset_password');

    })
};
