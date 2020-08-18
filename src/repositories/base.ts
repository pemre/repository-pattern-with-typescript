import { DummyQLConnector } from '../lib/dummyql-connector';

export abstract class BaseRepository<T> {
  constructor(private db: DummyQLConnector, private repoName: string) {
    this.db.addTable(this.repoName);
  }

  add(item: T): boolean {
    return this.db.create(this.repoName, item);
  }

  findBy(criteria: string, value: number | string): Array<T> {
    return this.db.read(this.repoName, criteria, value);
  }

  getAll(): Array<T> {
    return this.db.all(this.repoName);
  }
}
