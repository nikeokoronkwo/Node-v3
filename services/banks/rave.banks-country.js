const RaveBase = require('../../lib/rave.base');
const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { listSchema } = require('../schema/base');

/**
 * @async
 * @param {*} data 
 * @param {RaveBase} _rave 
 * @returns 
 */
async function service(data, _rave) {
  validator(listSchema, data);
  data.method = 'GET';
  data.excludeQuery = true;
  const { body: response } = await _rave.request(
    `v3/banks/${data.country}`,
    data,
  );
  logger(`Get banks by country`, _rave);
  return response;
}

module.exports = service;
