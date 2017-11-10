const keystone = require('keystone')
const Enquiry = keystone.list('Enquiry')

exports = module.exports = (req, res) => {

	const view = new keystone.View(req, res)
	let locals = res.locals

	// Set locals
	locals.section = 'contact'
	locals.enquiryTypes = Enquiry.fields.enquiryType.ops
	locals.formData = req.body || {}
	locals.validationErrors = {}
	locals.enquirySubmitted = false

	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'contact' }, function (next) {

		var newEnquiry = new Enquiry.model()
		var updater = newEnquiry.getUpdateHandler(req)

		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, phone, enquiryType, message',
			errorMessage: 'There was a problem submitting your enquiry:',
		}, (err) => {
			if (err) {
				locals.validationErrors = err.errors
			} else {
				locals.enquirySubmitted = true
			}
			next()
		})
	})

	view.render('contact')
}
