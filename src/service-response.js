/**
 * @copyright Matthew Bill
 */

/**
 * Class representing a service response.
 */
class ServiceReponse {
  constructor(status, content, correlationId) {
    const self = this;
    self.status = status;
    self.content = content;
    self.correlationId = correlationId;
  }
}

module.exports = ServiceReponse;
