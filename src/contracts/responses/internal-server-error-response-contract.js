/**
 * @copyright Matthew Bill
 */

const ExceptionErrorContract = require('../errors/exception-error-contract');

/**
 * Class representing an internal server error response contract.
 */
class InternalServerErrorResponseContract {
  /**
     * Contrsuctor for InternalServerErrorResponseContract.
     */
  constructor() {
    const self = this;
    self.errors = [];
    self.errors.push(new ExceptionErrorContract());
  }
}

module.exports = InternalServerErrorResponseContract;
