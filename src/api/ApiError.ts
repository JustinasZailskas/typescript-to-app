export class ApiError extends Error {
  constructor(
    public readonly operation: string,
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(`${operation} failed: ${message} (${statusCode})`);
  }
}
