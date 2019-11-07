const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateScore(data) {
  let errors = {};
  data.score = !isEmpty(data.score) ? data.score : '';

  if (Validator.isEmpty(data.score)) {
    errors.score = 'Please insert a score';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
