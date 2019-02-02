/* eslint-disable max-len */
/**
 * @copyright Matthew Bill
 */

const Guid = require('guid');
const { ServiceMetricNames } = require('nvoy');

const ServiceResponse = require('./service-response');
const BadRequestResponseContract = require('./contracts/responses/bad-request-response-contract');
const ForbiddenResponseContract = require('./contracts/responses/forbidden-response-contract');
const UnauthorizedResponseContract = require('./contracts/responses/unauthorized-response-contract');
const InternalServerErrorResponseContract = require('./contracts/responses/internal-server-error-response-contract');

/**
 * Class representing a base service.
 */
class BaseService {
  /**
     * Constructor for BaseService
     * @param {string} serviceName The name of the service
     * @param {ServiceMetricsEmitter} serviceMetricsEmitter The ServiceMetricsEmitter
     * @param {Logger} logger The winston logger.
     */
  constructor(serviceName, serviceMetricsEmitter, logger) {
    const self = this;
    self.serviceMetricsEmitter = serviceMetricsEmitter;
    self.serviceName = serviceName;
    self.logger = logger;
  }

  static getCorrelationSetMessage(correlationId) {
    return `${correlationId}:Correlation Id set.`;
  }

  static getRequestStartMessage(correlationId, timestamp) {
    return `${correlationId}:Request start: ${timestamp}.`;
  }

  static getRequestReceivedMessage(correlationId) {
    return `${correlationId}:Request received.`;
  }

  static getInternalExceptionResponseReturnedMessage(correlationId) {
    return `${correlationId}:Internal server exception response returned.`;
  }

  static getForbiddenResponseReturnedMessage(correlationId, errorsCount) {
    return `${correlationId}:Forbidden response returned with ${errorsCount} errors.`;
  }

  static getUnauthorizedResponseReturnedMessage(correlationId, errorsCount) {
    return `${correlationId}:Unauthorized response returned with ${errorsCount} errors.`;
  }

  static getBadRequestResponseReturnedMessage(correlationId, errorsCount) {
    return `${correlationId}:Bad response returned with ${errorsCount} validation errors.`;
  }

  static getNotFoundResponseReturnedMessage(correlationId) {
    return `${correlationId}:Not found response returned.`;
  }

  static getOkResponseReturnedMessage(correlationId) {
    return `${correlationId}:Ok response returned.`;
  }

  static getCreatedResponseReturnedMessage(correlationId) {
    return `${correlationId}:Created response returned.`;
  }

  static getNoContentResponseReturnedMessage(correlationId) {
    return `${correlationId}:No Content response returned.`;
  }

  static getResourceRetrievedMessage() {
    return 'Resource retrieved.';
  }

  static getServiceResponseReturnedMessage(correlationId) {
    return `${correlationId}:Service response returned:`;
  }

  static getRequestEndMessage(correlationId, timestamp) {
    return `${correlationId}:Request end: ${timestamp}`;
  }

  static getRequestDurationMessage(correlationId, duration) {
    return `${correlationId}:Request duration: ${duration} ms`;
  }

  /**
     * Logs and emits metrics for an internal server exception (500) service response.
     * @param {string} method The serivce metrics method.
     * @param {Guid} correlationId The correlation Id.
     * @param {InternalServerErrorResponseContract} contract The response contract.
     */
  logInternalServerException(method, correlationId, contract) {
    const self = this;
    self.logger.error(BaseService.getInternalExceptionResponseReturnedMessage(correlationId), contract);
    self.serviceMetricsEmitter.addServiceMethodCountMetric(self.serviceName, method, ServiceMetricNames.INTERNAL_SERVER_EXCEPTION_RESPONSES);
  }

  /**
     * Logs and emits metrics for a forbidden (403) service response.
     * @param {string} method The serivce metrics method.
     * @param {Guid} correlationId The correlation Id.
     * @param {ForbiddenResponseContract} contract The response contract.
     */
  logForbidden(method, correlationId, contract) {
    const self = this;
    self.logger.debug(BaseService.getForbiddenResponseReturnedMessage(correlationId, contract.errors.length), { contract });
    self.serviceMetricsEmitter.addServiceMethodCountMetric(self.serviceName, method, ServiceMetricNames.FORBIDDEN_RESPONSES);
  }

  /**
     * Logs and emits metrics for an unauthorized (401) service response.
     * @param {string} method The serivce metrics method.
     * @param {Guid} correlationId The correlation Id.
     * @param {UnauthorizedResponseContract} contract The response contract.
     */
  logUnauthorized(method, correlationId, contract) {
    const self = this;
    self.logger.debug(BaseService.getUnauthorizedResponseReturnedMessage(correlationId, contract.errors.length), { contract });
    self.serviceMetricsEmitter.addServiceMethodCountMetric(self.serviceName, method, ServiceMetricNames.UNAUTHORIZED_RESPONSES);
  }

  /**
     * Logs and emits metrics for a bad request (400) service response.
     * @param {string} method The serivce metrics method.
     * @param {Guid} correlationId The correlation Id.
     * @param {BadRequestResponseContract} contract The response contract.
     */
  logBadRequest(method, correlationId, contract) {
    const self = this;
    self.logger.debug(BaseService.getBadRequestResponseReturnedMessage(correlationId, contract.errors.length), { contract });
    self.serviceMetricsEmitter.addServiceMethodCountMetric(self.serviceName, method, ServiceMetricNames.BAD_REQUEST_RESPONSES);
  }

  /**
     * Logs and emits metrics for an unauthorized (404) service response.
     * @param {string} method The serivce metrics method.
     * @param {Guid} correlationId The correlation Id.
     */
  logNotFound(method, correlationId) {
    const self = this;
    self.logger.verbose(BaseService.getNotFoundResponseReturnedMessage(correlationId));
    self.serviceMetricsEmitter.addServiceMethodCountMetric(self.serviceName, method, ServiceMetricNames.NOT_FOUND_RESPONSES);
  }

  /**
     * Logs that an entity has been retrieved.
     * @param {Any} resource The resource that was retrieved from the repository.
     */
  logResourceRetrieved(resource) {
    const self = this;
    self.logger.verbose(BaseService.getResourceRetrievedMessage(), resource);
  }

  /**
     * Logs and emits metrics for an ok (200) service response.
     * @param {string} method The serivce metrics method.
     * @param {Guid} correlationId The correlation Id.
     * @param {Any} contract The response contract.
     */
  logOk(method, correlationId, contract) {
    const self = this;
    self.logger.debug(BaseService.getOkResponseReturnedMessage(correlationId), { contract });
    self.serviceMetricsEmitter.addServiceMethodCountMetric(self.serviceName, method, ServiceMetricNames.OK_RESPONSES);
  }

  /**
     * Logs and emits metrics for an ok (201) service response.
     * @param {string} method The serivce metrics method.
     * @param {Guid} correlationId The correlation Id.
     * @param {Any} contract The response contract.
     */
  logCreated(method, correlationId, contract) {
    const self = this;
    self.logger.debug(BaseService.getCreatedResponseReturnedMessage(correlationId), { contract });
    self.serviceMetricsEmitter.addServiceMethodCountMetric(self.serviceName, method, ServiceMetricNames.CREATED_RESPONSES);
  }

  /**
     * Logs and emits metrics for a no content (204) service response.
     * @param {string} method The serivce metrics method.
     * @param {Guid} correlationId The correlation Id.
     */
  logNoContent(method, correlationId) {
    const self = this;
    self.logger.debug(BaseService.getNoContentResponseReturnedMessage(correlationId));
    self.serviceMetricsEmitter.addServiceMethodCountMetric(self.serviceName, method, ServiceMetricNames.NO_CONTENT_RESPONSES);
  }

  /**
     * Gets a correlationId if one is not passed in with the original request.
     * @param {Guid} requestCorrelationId The correlationId passed into the request.
     */
  getCorrelationId(requestCorrelationId) {
    const self = this;
    let correlationId = requestCorrelationId;
    if (requestCorrelationId === undefined) {
      correlationId = Guid.create().value;
      self.logger.info(BaseService.getCorrelationSetMessage(correlationId));
    }
    return correlationId;
  }

  /**
     * Logs metrics needed for when a request is received.
     * @param {string} method The serivce metrics method.
     * @param {Guid} correlationId The correlation Id.
     * @param {number} requestStart The timestamp of when the initial request began.
     * @param {Any} request The request object passed into the service.
     */
  requestReceived(method, correlationId, requestStart, request) {
    const self = this;
    self.logger.debug(BaseService.getRequestStartMessage(correlationId, requestStart));
    self.logger.debug(BaseService.getRequestReceivedMessage(correlationId), request);
    self.serviceMetricsEmitter.addServiceMethodCountMetric(self.serviceName, method, ServiceMetricNames.REQUESTS);
    self.serviceMetricsEmitter.addRequestCountMetric(self.serviceName);
    return requestStart;
  }

  /**
     * Creates an interal server exception (500) service response.
     * @param {string} method The serivce metrics method.
     * @param {Guid} correlationId The correlation Id.
     * @param {number} requestStart The timestamp of when the initial request began.
     * @param {string} error The error that caused the internal server exception.
     * @return {ServiceResponse} The interal server exception (500) service response.
     */
  internalServerException(method, correlationId, requestStart, error) {
    const self = this;
    const contract = new InternalServerErrorResponseContract(error);
    self.logInternalServerException(method, correlationId, contract);
    return self.content(method, correlationId, requestStart, contract, 500);
  }

  /**
     * Creates a forbidden (403) service response.
     * @param {string} method The serivce metrics method.
     * @param {Guid} correlationId The correlation Id.
     * @param {number} requestStart The timestamp of when the initial request began.
     * @param {Array[AuthNErrorContract]} errors  The AuthN errors.
     * @return {ServiceResponse} forbidden (403) service response.
     */
  forbidden(method, correlationId, requestStart, errors) {
    const self = this;
    self.logForbidden(method, correlationId, errors);
    const contract = new ForbiddenResponseContract(errors);
    return self.content(method, correlationId, requestStart, contract, 403);
  }

  /**
     * Creates a unauthorized (401) service response.
     * @param {string} method The serivce metrics method.
     * @param {Guid} correlationId The correlation Id.
     * @param {number} requestStart The timestamp of when the initial request began.
     * @param {Array[AuthZErrorContract]} errors  The AuthZ errors.
     * @return {ServiceResponse} unauthorized (401) service response.
     */
  unauthorized(method, correlationId, requestStart, errors) {
    const self = this;
    self.logUnathorized(method, correlationId, errors);
    const contract = new UnauthorizedResponseContract(errors);
    return self.content(method, correlationId, requestStart, contract, 401);
  }

  /**
     * Creates a bad request (400) service response.
     * @param {string} method The serivce metrics method.
     * @param {Guid} correlationId The correlation Id.
     * @param {number} requestStart The timestamp of when the initial request began.
     * @param {Array[ValidationErrorContract]} errors  The validation errors.
     * @return {ServiceResponse} bad request (400) service response.
     */
  badRequest(method, correlationId, requestStart, errors) {
    const self = this;
    const contract = new BadRequestResponseContract(errors);
    self.logBadRequest(method, correlationId, contract);
    return self.content(method, correlationId, requestStart, contract, 400);
  }

  /**
     * Creates a not found (404) service response.
     * @param {string} method
     * @param {Guid} correlationId The correlation Id.
     * @param {number} requestStart The timestamp of when the initial request began.
     * @return {ServiceResponse} The not found (400) service response.
     */
  notFound(method, correlationId, requestStart) {
    const self = this;
    self.logNotFound(method, correlationId);
    return self.content(method, correlationId, requestStart, null, 404);
  }

  /**
     * Creates an ok (200) service response.
     * @param {string} method The serivce metrics method.
     * @param {Guid} correlationId The correlation Id.
     * @param {number} requestStart The timestamp of when the initial request began.
     * @param {Any} contract The body of the response.
     * @return {ServiceResponse} The ok (200) service response.
     */
  ok(method, correlationId, requestStart, contract) {
    const self = this;
    self.logOk(method, correlationId, contract);
    return self.content(method, correlationId, requestStart, contract, 200);
  }

  /**
     * Creates a created (201) service response.
     * @param {string} method The serivce metrics method.
     * @param {Guid} correlationId The correlation Id.
     * @param {number} requestStart The timestamp of when the initial request began.
     * @param {Any} contract The body of the response.
     * @return {ServiceResponse} The ok (201) service response.
     */
  created(method, correlationId, requestStart, contract) {
    const self = this;
    self.logCreated(method, correlationId, contract);
    return self.content(method, correlationId, requestStart, contract, 201);
  }

  /**
     * Creates a no content (204) service response.
     * @param {string} method The serivce metrics method.
     * @param {Guid} correlationId The correlation Id.
     * @param {number} requestStart The timestamp of when the initial request began.
     * @return {ServiceResponse} The ok (204) service response.
     */
  noContent(method, correlationId, requestStart) {
    const self = this;
    self.logCreated(method, correlationId);
    return self.content(method, correlationId, requestStart, null, 204);
  }

  /**
     * Creates a service response for some content.
     * @param {string} method The serivce metrics method.
     * @param {Guid} correlationId The correlation Id.
     * @param {number} requestStart The timestamp of when the initial request began.
     * @param {Any} content The body of the response.
     * @param {number} status The http status code.
     * @return {ServiceResponse} The service response.
     */
  content(method, correlationId, requestStart, content, status) {
    const self = this;
    const serviceResponse = new ServiceResponse();
    serviceResponse.correlationId = correlationId;
    serviceResponse.content = content;
    serviceResponse.status = status;
    self.logger.verbose(BaseService.getServiceResponseReturnedMessage(correlationId), { serviceResponse });
    const requestEnd = Date.now();
    const responseTime = requestEnd - requestStart;
    const responseSize = Buffer.byteLength(JSON.stringify(content));
    self.logger.debug(BaseService.getRequestEndMessage(correlationId, requestEnd));
    self.logger.info(BaseService.getRequestDurationMessage(correlationId, responseTime));
    self.serviceMetricsEmitter.addServiceResponseTimeMetric(self.serviceName, method, responseTime);
    self.serviceMetricsEmitter.addServiceResponseSizeMetric(self.serviceName, method, responseSize);
    return serviceResponse;
  }
}

module.exports = BaseService;
