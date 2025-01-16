export default class ErrorResponse {
  public static throw(code: string, description: string, status?: number) {
    return [
      {
        error_code: code,
        error_description: description,
      },
      status || 400,
    ];
  }
}
