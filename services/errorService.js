class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class EmailServiceError extends Error {
  constructor(message) {
    super(message);
    this.name = "EmailServiceError";
  }
}

class AddressServiceError extends Error {
  constructor(message) {
    super(message);
    this.name = "AddressServiceError";
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
  }
}

class SlotError extends Error {
  constructor(message) {
    super(message);
    this.name = "SlotError";
  }
}

class MessageCreationError extends Error {
  constructor(message) {
    super(message);
    this.name = "MessageCreationError";
  }
}

class QueryError extends Error {
  constructor(message) {
    super(message);
    this.name = "QueryError";
  }
}

class UnsupportedFileTypeError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnsupportedFileTypeError";
  }
}

module.exports = {
  ValidationError,
  EmailServiceError,
  AddressServiceError,
  AuthenticationError,
  SlotError,
  MessageCreationError,
  QueryError,
  UnsupportedFileTypeError,
};
