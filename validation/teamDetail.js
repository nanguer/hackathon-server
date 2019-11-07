const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTeamDetail(data) {
  let errors = {};
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.mobile = !isEmpty(data.mobile) ? data.mobile : '';

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First Name is required';
  }
  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = 'First Name must have from 2 to 30 chars';
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last Name is required';
  }
  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = 'Last Name must have from 2 to 30 chars';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (!Validator.isLength(data.mobile, { min: 6, max: 15 })) {
    errors.mobile = 'Mobile must have from 6 to 15 chars';
  }

  if (Validator.isEmpty(data.mobile)) {
    errors.mobile = 'Mobile is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
