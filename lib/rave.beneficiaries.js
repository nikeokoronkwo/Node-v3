/**
  * @typedef {import('./lib').RaveHandler} RaveHandler
  */

const create_beneficiary = require('../services/beneficiaries/rave.create');
const del_beneficiary = require('../services/beneficiaries/rave.delete');
const retrieve_all = require('../services/beneficiaries/rave.retrieve');
const retrieve = require('../services/beneficiaries/rave.single.retrieve');
const RaveBase = require('./rave.base');

/**
 * @constructor Beneficiaries
 * @classdesc Beneficiaries class
 * 
 * @param {RaveBase} RaveBase 
 */
function Beneficiaries(RaveBase) {
  /** @type {RaveHandler} */
  this.create = function (data) {
    return create_beneficiary(data, RaveBase);
  };

  /** @type {RaveHandler} */
  this.delete = function (data) {
    return del_beneficiary(data, RaveBase);
  };

  /** @type {RaveHandler} */
  this.fetch_all = function (data) {
    return retrieve_all(data, RaveBase);
  };

  /** @type {RaveHandler} */
  this.fetch = function (data) {
    return retrieve(data, RaveBase);
  };
}
module.exports = Beneficiaries;
