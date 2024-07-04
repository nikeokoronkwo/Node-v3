/**
  * @typedef {import('./lib').RaveHandler} RaveHandler
  */

const banks_branches = require('../services/banks/rave.banks-branches');
const banks_country = require('../services/banks/rave.banks-country');
const RaveBase = require('./rave.base');

/**
 * Initialise a new Bank
 * @constructor
 * @classdesc Bank Object
 * 
 * @param {RaveBase} RaveBase
 */
function Bank(RaveBase) {
  /** @type {RaveHandler} */
  this.branches = function (data) {
    return banks_branches(data, RaveBase);
  };

  /** @type {RaveHandler} */
  this.country = function (data) {
    return banks_country(data, RaveBase);
  };
}
module.exports = Bank;
