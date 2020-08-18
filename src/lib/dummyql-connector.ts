/* eslint-disable
  @typescript-eslint/no-explicit-any,
  @typescript-eslint/explicit-module-boundary-types
*/
export class DummyQLConnector {
  public database: Record<string, Array<any>>;

  constructor() {
    this.database = {};
  }

  addTable(name: string): void {
    this.database[name] = [];
  }

  /**
   * CRUD: Create Read Update Delete
   */

  create(tableName: string, data: any): boolean {
    this.database[tableName].push(data);
    return true;
  }

  read(tableName: string, column: string, data: any): Array<any> {
    return this.database[tableName].filter((d) => d[column] === data);
  }

  static update(): void {
    throw new Error('Method not implemented.');
  }

  static delete(): void {
    throw new Error('Method not implemented.');
  }

  /**
   * Some extra features (!)
   */

  all(tableName: string): Array<any> {
    return this.database[tableName];
  }

  count(tableName: string): number {
    return this.database[tableName].length;
  }
}
