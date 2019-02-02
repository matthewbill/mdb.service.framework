/**
 * @copyright Matthew Bill
*/

// Contracts
const ApiErrorContract = require('./src/contracts/errors/api-error-contract');
const ErrorType = require('./src/contracts/errors/error-types');
const ExceptionErrorContract = require('./src/contracts/errors/exception-error-contract');
const ValidationErrorContract = require('./src/contracts/errors/validation-error-contract');
const AuthNErrorContract = require('./src/contracts/errors/authn-error-contract');
const AuthZErrorContract = require('./src/contracts/errors/authz-error-contract');

const BaseService = require('./src/base-service');
const LinkBuilder = require('./src/link-builder');
const ServiceResponse = require('./src/service-response');

module.exports = {
  ApiErrorContract,
  ErrorType,
  ExceptionErrorContract,
  ValidationErrorContract,
  AuthNErrorContract,
  AuthZErrorContract,
  BaseService,
  LinkBuilder,
  ServiceResponse,
};
