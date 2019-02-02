/**
 * @copyright Matthew Bill
 */

const ApiErrorContract = require('./api-error-contract');
const ErrorTypes = require('./error-types');

/**
 * Class representing an authn error contract.
 * @extends ApiErrorContract
 */
class AuthNErrorContract extends ApiErrorContract {
  /**
   * Constructor for AuthNErrorContract
   * @param {string} code A unique code for the service endpoint. It should be in pascal case with no spaces.
   * @param {string} message User friendly message that can be presented without further formatting.
   */
  constructor(code, message) {
    super(code, message, ErrorTypes.AuthN);
  }
}

module.exports = AuthNErrorContract;
