/**
 * @copyright Matthew Bill
 */

/**
 * Class representing an api error contract.
 */
class ApiErrorContract {
  /**
   * Gets the code
   * @return {string} The code.
   */
  get code() { return this._code; }

  set code(value) { this._code = value; }

  /**
   * Gets the message
   * @return {string} The message.
   */
  get message() { return this._message; }

  set message(value) { this._message = value; }

  /**
   * Gets the type
   * @return {string} The Type.
   */
  get type() { return this._type; }

  set type(value) { this._type = value; }

  /**
   * Constructor for ApiErrorContract.
   * @param {string} code A unique code for the service endpoint. It should be in pascal case with no spaces.
   * @param {string} message User friendly message that can be presented without further formatting.
   * @param {string} type The type of error.
   */
  constructor(code, message, type) {
    const self = this;
    self._code = code;
    self._message = message;
    self._type = type;
  }
}

module.exports = ApiErrorContract;
