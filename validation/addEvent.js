const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAddEvent(data) {
	let errors = {};
	data.title = !isEmpty(data.title)? data.title: '';
	data.description = !isEmpty(data.description) ? data.description : '';
	data.status = !isEmpty(data.status) ? data.status : '';
	data.startDate = !isEmpty(data.startDate) ? data.startDate : '';
	data.endDate = !isEmpty(data.endDate) ? data.endDate : '';
	data.location = !isEmpty(data.location) ? data.location : '';
	data.evaluator = !isEmpty(data.evaluator) ? data.evaluator : '';

	if (Validator.isEmpty(data.title)) {
		errors.title = 'Event title is required';
	}

	if (Validator.isEmpty(data.description)) {
		errors.description = 'Event description is required';
	}
	if (!Validator.isLength(data.description, { min: 2, max: 500 })) {
		errors.description = 'Event description should be between 2 to 500 chars';
	}
	if (!Validator.isLength(data.title, { min: 2, max: 30 })) {
		errors.title = 'Event title should be between 2 to 30 chars';
	}

	if (Validator.isEmpty(data.startDate)) {
		errors.startDate = 'Start date field is required';
	}

	if (Validator.isEmpty(data.endDate)) {
		errors.endDate = 'End date field is required';
	}
	if(data.startDate > data.endDate){
		errors.endDate = 'End date should be bigger than start date'; 
	}

	if (Validator.isEmpty(data.evaluator)) {
		errors.evaluator = 'Please select an evaluator';
	}
	if (Validator.isEmpty(data.location)) {
		errors.location = 'Please select a location for the event';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
