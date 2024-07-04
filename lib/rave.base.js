/**
 * @typedef {import('./lib').RaveBaseReqReturn} RaveBaseReqReturn
 * @typedef {import('./lib').RaveBasePayload} RaveBasePayload
 */

var q = require('q');
const querystring = require('querystring');
var RaveUtils = require('../utils/rave.utils');
var Request = require('request');
var Security = require('./security');

/**
 * 
 * @constructor RaveBase
 * @classdesc RaveBase
 * 
 * @param {string} public_key 
 * @param {string} secret_key 
 * @param {string} [_base_url] 
 * 
 */
var RaveBase = function (public_key, secret_key, _base_url) {
  RaveUtils.emptyCheck(public_key, 'Public Key required');
  RaveUtils.emptyCheck(secret_key, 'Secret Key required');

  var public_key = public_key;
  var secret_key = secret_key;
  var base_url = 'https://api.flutterwave.com/';

  // Override BaseURL
  if (_base_url && typeof _base_url === 'string') {
    base_url = _base_url;
  }

  // this.MORX_DEFAULT = {
  //   throw_error: true,
  // };
  /**
   * Get public key
   * @returns {string} The public key
   */
  this.getPublicKey = function () {
    return public_key;
  };

  /**
   * Get secret key
   * @returns {string} The secret key
   */
  this.getSecretKey = function () {
    return secret_key;
  };

  /**
   * Get base url
   * @returns {string} The base url
   */
  this.getBaseUrl = function () {
    return base_url;
  };

  /**
   * Set base url
   * @param {string} new_base_url The new base url
   * @returns {void}
   */
  this.setBaseUrl = function (new_base_url) {
    if (new_base_url) {
      base_url = new_base_url;
    }
  };

  /**
   * 
   * @param {string} path 
   * @param {RaveBasePayload} payload
   * @param {*} [callback] 
   * @returns 
   */
  this.request = function (path, payload, callback) {
    /** @type {RaveBaseReqReturn} */
    var requestOptions = {};
    var requestMethod = RaveUtils.initDefaultValue(
      payload.method,
      'POST' || 'PUT',
    );
    var datakey = requestMethod == 'POST' || 'PUT' ? 'body' : 'qs';
    var requestJSON = datakey == 'body' ? true : false;
    var includeQueryParams = RaveUtils.initDefaultValue(
      payload.excludeQuery,
      false,
    );

    if (requestMethod === 'GET') {
      delete payload.method;
      if (includeQueryParams == true) {
        delete payload.excludeQuery;
        requestOptions.uri = path;
      } else {
        const queryParams = querystring.stringify(payload);
        requestOptions.uri = path += `${queryParams}`;
      }
    } else {
      requestOptions.uri = path;
    }

    requestOptions.baseUrl = this.getBaseUrl();
    requestOptions.method = requestMethod;
    requestOptions[datakey] = RaveUtils.initDefaultValue(payload, {});
    requestOptions.json = requestJSON;
    requestOptions.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getSecretKey()}`,
    };

    // console.log(requestOptions);

    if (callback) {
      this._makeRequest(requestOptions, callback);
      return requestOptions;
    } else {
      return this._makePromiseRequest(requestOptions);
    }
  };
};

/**
 * @memberof RaveBase
 * @param {Object} data The data to encrypt
 * @returns {string}
 */
RaveBase.prototype.encrypt = function (data) {
  var encryption_key = Security.getEncryptionKey(this.getSecretKey());
  return Security.encrypt(encryption_key, JSON.stringify(data));
};

/**
 * 
 * @param {*} data 
 * @returns 
 */
RaveBase.prototype.getIntegrityHash = function (data) {
  return Security.getIntegrityHash(
    data,
    this.getPublicKey(),
    this.getSecretKey(),
  );
};

/**
 * @memberof RaveBase
 * @private
 * 
 * @param {RaveBaseReqReturn} requestOptions 
 * @param {Request.RequestCallback} callback 
 */
RaveBase.prototype._makeRequest = function (requestOptions, callback) {
  Request(requestOptions, function (err, res, body) {
    if (typeof res == 'undefined') {
      /** @type {Response} */
      res = {};
    }

    if (typeof body == 'undefined') {
      body = {};
    }
    callback(err, res, body);
  });
};

/**
 * @memberof RaveBase
 * @private
 * 
 * @async
 * @param {RaveBaseReqReturn} requestOptions 
 * @returns {Promise<Request.Response>}
 */
RaveBase.prototype._makePromiseRequest = function (requestOptions) {
  var self = this;
  return new Promise(function (resolve, reject) {
    self._makeRequest(requestOptions, function (err, res, body) {
      if (err) {
        reject(err);
      } else {
        // resolve should use only one parameter??
        resolve(res, body);
      }
    });
  });
};

module.exports = RaveBase;
