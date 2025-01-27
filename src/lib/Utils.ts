export class Utils {
  static getPagination(page: number, limit: number): number {
    const pagination = page * limit - limit;

    return pagination;
  }
}
