/**
 * @copyright Matthew Bill
 */

/**
 * Class representing a bad request response conract.
 */
class BadRequestResponseContract {
  /**
   * Constructor for BadRequestResponseContract.
   * @param {Array} errors Array of errors resulting in the bad request.
   */
  constructor(errors) {
    const self = this;
    self.errors = errors;
  }
}

module.exports = BadRequestResponseContract;
