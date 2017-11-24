var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
  is_investor: { type: Boolean, label: 'Is Investor', default: true },
  active: { type: Boolean, label: 'Active', default: true },
  reset_password_hash: { type: String },
	// entities: { type: Types.Relationship, ref: 'Entity', many: true },
}, 'Permissions', {
	is_admin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.is_admin;
});


/**
 * Registration
 */
User.defaultColumns = 'name, email, is_admin';
User.register();
