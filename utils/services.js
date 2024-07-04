/**
 * @author Nike Okoronkwo <nikechukwu@gmail.com>
 * 
 * This file exports a single function used for making rave handlers easy to define without repetitive functions
 * To do this, a {@link defineService} function is exported.
 * 
 * @example
 * // example using rave.create.cjs
 * const defineService = require("../../utils/services");
 * const { beneficiarySchema } = require('../schema/create');
 * 
 * module.exports = defineService(`v3/beneficiaries`, beneficiarySchema);
 * 
 * @typedef {import("../services/services").ServiceHandler} ServiceHandler
 */

const joi = require("joi");
const { validator } = require('./validator');
const { logger } = require('./logger');

/**
 * 
 */

/**
 * Creates a service handler function, to reduce repetitiveness
 * @param {string | (data: string) => string} endpoint The url endpoint that Rave will fetch from, represented as either a function returning a string (for dynamic urls) or a string.
 * @param {joi.ObjectSchema} schema The {@link joi} Object Schema used for validating the data
 * @param {string} loggerName The log name or log title used for the {@link logger} to run in the service function
 * @param {(data: any) => void} [modifier] The modifier that can be used for setting properties on the object, such as `method` or `excludeQuery`
 * @returns {ServiceHandler}
 */
function defineService(endpoint, schema, loggerName, modifier) {
    return async function(data, rave) {
        validator(schema, data);
        modifier(data);
        const { body: response } = await rave.request(
            typeof endpoint === "function" ? endpoint(data) : endpoint,
            data
        );
        logger(loggerName, rave);
        return response;
    }
}

module.exports = defineService