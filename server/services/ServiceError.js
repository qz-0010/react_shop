class ServiceError extends Error {
  constructor(code, errors) {
    super(errors);
    this.name = 'ServiceError';
    this.code = code;
    this.message = errors;
    this.errors = errors;
  }
}

module.exports = ServiceError;