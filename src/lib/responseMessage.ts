export default class ErrorResponse {
  public static throw(description: string, status?: number, errors?: any) {
    return [
      {
        error_description: description,
        errors,
      },
      status || 400,
    ];
  }
}
