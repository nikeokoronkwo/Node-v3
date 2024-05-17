const base = require('./lib/rave.base');
const bank = require('./lib/rave.banks');
const beneficiary = require('./lib/rave.beneficiaries');
const bills = require('./lib/rave.bills');
const charge = require('./lib/rave.charge');
const ebills = require('./lib/rave.ebills');
const misc = require('./lib/rave.misc');
const mobile_money = require('./lib/rave.mobile_money');
const security = require('./lib/security');
// const custom = require("./lib/rave.custom");
const otps = require('./lib/rave.otps');
const payment_plan = require('./lib/rave.payment_plan');
const settlement = require('./lib/rave.settlements');
const subaccount = require('./lib/rave.subaccount');
const subscription = require('./lib/rave.subscriptions');
const tokenized = require('./lib/rave.tokenized');
const transaction = require('./lib/rave.transactions');
const transfer = require('./lib/rave.transfers');
const virtual_acct = require('./lib/rave.virtual_account');
const virtual_card = require('./lib/rave.virtual_cards');

/**
 * Rave class
 */
class Rave {
  /**
   * Constructor to instantiate new rave
   * @param {*} public_key
   * @param {*} public_secret
   * @param {*} base_url_or_production_flag
   * @returns {void}
   * @constructor
   */
  constructor(public_key, public_secret, base_url_or_production_flag) {
    /** @type {base} */
    const ravebase = new base(
      public_key,
      public_secret,
      base_url_or_production_flag,
    );

    /** @type {bank} */
    this.Bank = new bank(ravebase);
    /** @type {beneficiary} */
    this.Beneficiary = new beneficiary(ravebase);
    /** @type {bills} */
    this.Bills = new bills(ravebase);
    /** @type {charge} */
    this.Charge = new charge(ravebase);
    /** @type {ebills} */
    this.Ebills = new ebills(ravebase);
    /** @type {misc} */
    this.Misc = new misc(ravebase);
    /** @type {mobile_money} */
    this.MobileMoney = new mobile_money(ravebase);
    /** @type {typeof security} */
    this.security = security;
    // /** @type {custom} */
    //   this.CustomRequest = new custom(ravebase);
    /** @type {otps} */
    this.Otp = new otps(ravebase);
    /** @type {payment_plan} */
    this.PaymentPlan = new payment_plan(ravebase);
    /** @type {settlement} */
    this.Settlement = new settlement(ravebase);
    /** @type {subscription} */
    this.Subscription = new subscription(ravebase);
    /** @type {subaccount} */
    this.Subaccount = new subaccount(ravebase);
    /** @type {tokenized} */
    this.Tokenized = new tokenized(ravebase);
    /** @type {transaction} */
    this.Transaction = new transaction(ravebase);
    /** @type {transfer} */
    this.Transfer = new transfer(ravebase);
    /** @type {virtual_acct} */
    this.VirtualAcct = new virtual_acct(ravebase);
    /** @type {virtual_card} */
    this.VirtualCard = new virtual_card(ravebase);

    /**
     * @callback IntegrityHashCallback
     * @param {any} data
     * @returns {string}
     */
    /** @type {IntegrityHashCallback} */
    this.getIntegrityHash = function (data) {
      return ravebase.getIntegrityHash(data);
    };
  }
}

module.exports = Rave;
