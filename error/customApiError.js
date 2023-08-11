class customApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomApiError = (msg, statusCode) => {
  return new customApiError(msg, statusCode);
};

export { createCustomApiError };
