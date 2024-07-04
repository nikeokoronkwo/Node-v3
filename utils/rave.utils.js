/**
 * @namespace RaveUtils
 */
var RaveUtils = {};

/**
 * Checks whether a given value is undefined or empty
 * @template T
 * @param {?T} value The value to check
 * @param {?string} message The error message
 * @param {?ErrorConstructor} error An error constructor to use to throw the error
 * @throws {Error} If the value is undefined it throws an error
 */
RaveUtils.emptyCheck = function (value, message, error) {
  message = message || 'Some error occured';
  error = error || Error;
  if (!value || typeof value == 'undefined') throw new error(message);
};

/**
 * Performs null checking on a value with a default fallback value if the value is null
 * @template T
 * @param {?T} value The value to check
 * @param {T} default_value The default value if {@link value} is undefined
 * @returns {T} The desired value, which is {@link value} if defined, or {@link default_value} otherwise
 */
RaveUtils.initDefaultValue = function (value, default_value) {
  return value || default_value;
};

module.exports = RaveUtils;
