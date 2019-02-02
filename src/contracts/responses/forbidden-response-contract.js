/**
 * @copyright Matthew Bill
 */

/**
 * Class representing an forbidden response conract.
 */
class ForbiddenResponseContract {
  /**
   * Constructor for ForbiddenResponseContract.
   * @param {Array[AuthNErrorContract]} errors Array of AuthN errors.
   */
  constructor(errors) {
    const self = this;
    self.errors = errors;
  }
}

module.exports = ForbiddenResponseContract;
