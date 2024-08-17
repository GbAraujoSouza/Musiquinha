export default class ErrorHandler {
  public static getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;

    return String(error);
  }
}

