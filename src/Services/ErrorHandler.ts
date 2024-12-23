import { NotificationService } from "./NotificationService";

export class BaseError extends Error {
  constructor(
    public message: string,
    public code: string,
    public additionalDetails: Record<string, any> = {}
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
  getError() {
    return {
      message: this.message,
      code: this.code,
      additionalDetail: this.additionalDetails,
      dateTime: new Date().toISOString,
    };
  }
}

export class ValidateError extends BaseError {
  constructor(
    message: string = "Validation error",
    additionalDetails: Record<string, any> = {}
  ) {
    super(message, "VALIDATE_ERROR", additionalDetails);
  }
}

export class AuthError extends BaseError {
  constructor(
    message: string = "Auth error",
    additionalDetails: Record<string, any> = {}
  ) {
    super(message, "AUTH_ERROR", additionalDetails);
  }
}

export class ServerError extends BaseError {
  constructor(
    message: string = "Server error",
    additionalDetails: Record<string, any> = {}
  ) {
    super(message, "SERVER_ERROR", additionalDetails);
  }
}

export class UndefinedError extends BaseError {
  constructor(
    message: string = "Undefined error",
    additionalDetails: Record<string, any> = {}
  ) {
    super(message, "UNDEFINED_ERROR", additionalDetails);
  }
}

export class ErrorHandler {
  private static instance: ErrorHandler;
  public static getInstance() {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  public handle(error: unknown): void {
    if (error instanceof ValidateError) {
      //instanceof reikia naudoti klases pavadinima galima ir su error.code === "VALIDATE_ERROR"
      NotificationService.getInstance().show(error.message, "error");
      NotificationService.getInstance().error(error.message);
    }
    if (error instanceof AuthError) {
      //instanceof reikia naudoti klases pavadinima galima ir su error.code === "VALIDATE_ERROR"
      NotificationService.getInstance().show(error.message, "error");
    }
  }
}
