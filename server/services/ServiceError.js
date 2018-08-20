class ServiceError extends Error {
  constructor(name, errors) {
    super(errors);
    this.name = name || 'ServiceError';
    this.message = errors;
    this.errors = errors;
  }
}

module.exports = ServiceError;