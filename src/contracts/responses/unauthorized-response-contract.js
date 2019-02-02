/**
 * @copyright Matthew Bill
 */

/**
 * Class representing an unauthorized response conract.
 */
class UnauthorizedResponseContract {
  /**
   * Constructor for UnauthorizedResponseContract.
   * @param {Array[AuthZErrorContract]} errors Array of AuthZ errors.
   */
  constructor(errors) {
    const self = this;
    self.errors = errors;
  }
}

module.exports = UnauthorizedResponseContract;
