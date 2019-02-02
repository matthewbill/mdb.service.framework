describe('exports', () => {
  test('exports work correctly', () => {
    const {BaseService} = require('../index');
    expect(BaseService).toBeDefined();

    const {LinkBuilder} = require('../index');
    expect(LinkBuilder).toBeDefined();

    const {ServiceResponse} = require('../index');
    expect(ServiceResponse).toBeDefined();

    const {ApiErrorContract} = require('../index');
    expect(ApiErrorContract).toBeDefined();

    const {ErrorType} = require('../index');
    expect(ErrorType).toBeDefined();

    const {ExceptionErrorContract} = require('../index');
    expect(ExceptionErrorContract).toBeDefined();

    const {ValidationErrorContract} = require('../index');
    expect(ValidationErrorContract).toBeDefined();

    const {AuthNErrorContract} = require('../index');
    expect(AuthNErrorContract).toBeDefined();

    const {AuthZErrorContract} = require('../index');
    expect(AuthZErrorContract).toBeDefined();
  });
});
