const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
	let errors = {};
	data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
	data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.userType = !isEmpty(data.userType) ? data.userType : '';
	data.doj = !isEmpty(data.doj) ? data.doj : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.password_confirm = !isEmpty(data.password_confirm)
		? data.password_confirm
		: '';

	if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
		errors.firstName = 'First name must be between 2 to 30 chars';
	}

	if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
		errors.lastName = 'Last name must be between 2 to 30 chars';
	}

	if (Validator.isEmpty(data.firstName)) {
		errors.firstName = 'First name field is required';
	}

	if (Validator.isEmpty(data.lastName)) {
		errors.lastName = 'Last name field is required';
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email is required';
	}

	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must have 6 chars';
	}

	if (Validator.isEmpty(data.userType)) {
		errors.userType = 'Please select user type';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password is required';
	}

	if (!Validator.isLength(data.password_confirm, { min: 6, max: 30 })) {
		errors.password_confirm = 'Password must have 6 chars';
	}

	if (!Validator.equals(data.password, data.password_confirm)) {
		errors.password_confirm = 'Password and Confirm Password must match';
	}

	if (Validator.isEmpty(data.password_confirm)) {
		errors.password_confirm = 'Password is required';
	}

	if (Validator.isEmpty(data.doj)) {
		errors.doj = 'Please select date of joining';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
