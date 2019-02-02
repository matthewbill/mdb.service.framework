/**
 * @copyright Matthew Bill
 */

const ApiErrorContract = require('./api-error-contract');
const ErrorTypes = require('./error-types');

/**
 * Class representing an validation error contract.
 * @extends ApiErrorContract
 */
class ValidationErrorContract extends ApiErrorContract {
  /**
     * Constructor for ValidationErrorContract
     * @param {string} code A unique code for the service endpoint. It should be in pascal case with no spaces.
     * @param {string} message User friendly message that can be presented without further formatting.
     */
  constructor(code, message) {
    super(code, message, ErrorTypes.Validation);
  }
}

module.exports = ValidationErrorContract;
