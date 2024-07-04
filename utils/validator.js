const joi = require('joi');
const { validationError } = require('./error');

/**
 * 
 * @param {joi.ObjectSchema} schema 
 * @param {any} data 
 * @throws {import('joi').ValidationError} If the schema isn't valid
 */
exports.validator = (schema, data) => {
  const validation = schema.validate(data);
  const { _, error } = validation;

  if (error) {
    const message = error.details.map((x) => x.message);
    throw new validationError(message);
  }
};
