import { BaseRepository } from './base';
import { Restaurant } from '../models/restaurant';

export class RestaurantRepository extends BaseRepository<Restaurant> {
  // Here we can create db related methods of this repo
  getByCity(name: string): Array<Restaurant> {
    return this.findBy('city', name);
  }
}
