import { BaseRepository } from './base';
import { Customer } from '../models/customer';

export class CustomerRepository extends BaseRepository<Customer> {
  // Here we can create db related methods of this repo
  getOldest(): Customer {
    return this
      .getAll()
      .reduce((l, e) => (e.getAge() > l.getAge() ? e : l));
  }
}
