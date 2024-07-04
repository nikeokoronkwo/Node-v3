const joi = require('joi');
const { validationError } = require('./error');

/**
 * Validates a given schema ({@link joi.ObjectSchema}) over the given data passed
 * @param {joi.ObjectSchema} schema 
 * @param {any} data 
 * @throws {joi.ValidationError} If the schema isn't valid
 */
exports.validator = (schema, data) => {
  const validation = schema.validate(data);
  const { _, error } = validation;

  if (error) {
    const message = error.details.map((x) => x.message);
    throw new validationError(message);
  }
};
