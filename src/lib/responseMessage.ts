export default class ErrorResponse {
  public static throw(description: string, status?: number) {
    return [
      {
        error_description: description,
      },
      status || 400,
    ];
  }
}
