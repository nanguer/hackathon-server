const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEventRegister(data) {
  let errors = {};
  data.teamName = !isEmpty(data.teamName) ? data.teamName : '';
  data.teamSize = !isEmpty(data.teamSize) ? data.teamSize : '';
  data.ideaSubject = !isEmpty(data.ideaSubject) ? data.ideaSubject : '';
  data.ideaSummary = !isEmpty(data.ideaSummary) ? data.ideaSummary : '';

  if (!Validator.isLength(data.teamName, { min: 2, max: 30 })) {
    errors.teamName = 'Team name must be between 2 to 30 chars';
  }

  if (Validator.isEmpty(data.teamName)) {
    errors.teamName = 'Team name field is required';
  }

  if (Validator.isEmpty(data.teamSize)) {
    errors.teamSize = 'Team size field is required';
  }

  if (Validator.contains(data.teamSize, /^[0-9]*$/gm)) {
    errors.teamSize = 'Team size must be a number';
  }

  if (data.teamSize < 0 || data.teamSize > 10) {
    errors.teamSize = 'Teams must be between 1 to 10 participants';
  }

  if (Validator.isEmpty(data.ideaSubject)) {
    errors.ideaSubject = 'Please fill in your idea subject!';
  }
  if (!Validator.isLength(data.ideaSubject, { min: 2, max: 30 })) {
    errors.ideaSubject = 'Idea subject  must be between 2 to 30 chars';
  }
  if (Validator.isEmpty(data.ideaSummary)) {
    errors.ideaSummary = 'Please fill in the idea summary!';
  }
  if (!Validator.isLength(data.ideaSummary, { min: 2, max: 500 })) {
    errors.ideaSummary = 'Idea summary must be between 2 to 500 chars';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
