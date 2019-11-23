import { DummyQLConnector } from '../lib/dummyql-connector';

export abstract class BaseRepository<T> {
  constructor(private db: DummyQLConnector, private repoName: string) {
    this.db.addTable(this.repoName);
  }

  add(item: T): boolean {
    return this.db.create(this.repoName, item);
  }

  getAll(): Array<T> {
    return this.db.all(this.repoName);
  }

  findBy(criteria, value): Array<T> {
    const returnOnlyFirstOne = false;
    return this.db.read(this.repoName, criteria, value, returnOnlyFirstOne);
  }
}
