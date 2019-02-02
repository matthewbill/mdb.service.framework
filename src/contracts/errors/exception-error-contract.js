/**
 * @copyright Matthew Bill
 */

const ApiErrorContract = require('./api-error-contract');
const ErrorTypes = require('./error-types');

/**
 * Class representing an exception error contract.
 * @extends ApiErrorContract
 */
class ExceptionErrorContract extends ApiErrorContract {
  /**
     * Constructor for ApiErrorContract
     */
  constructor() {
    super('InternalError', 'We encountered an internal error. Please try again.', ErrorTypes.Exception);
  }
}

module.exports = ExceptionErrorContract;
