import { Customer } from './models/customer';
import { Restaurant } from './models/restaurant';
import { CustomerRepository } from './repositories/customer';
import { RestaurantRepository } from './repositories/restaurant';
import { DummyQLConnector } from './lib/dummyql-connector';
import { log } from './lib/helpers';

/**
 * The App
 *
 * We're lazy, we'll do everything in constructor() for now
 */

class App {
  constructor() {
    // Connect to database
    const db = new DummyQLConnector();

    /**
     * Use CustomerRepository
     */

    const repoCustomer = new CustomerRepository(db, 'customer');

    // Call create() method from BaseRepository
    const resultOne = repoCustomer.add(new Customer('Alice', 32));
    log(`Customer added with ${resultOne ? 'success' : 'fail'}`);

    repoCustomer.add(new Customer('Bob', 16));
    repoCustomer.add(new Customer('Carol', 48));
    repoCustomer.add(new Customer('Dave', 24));

    // Call a specific method from CustomerRepository
    const customerOldest = repoCustomer.getOldest();
    log(`The oldest customer is ${customerOldest.getName()}: Age ${customerOldest.getAge()}`);

    /**
     * Use RestaurantRepository
     */

    const repoRestaurant = new RestaurantRepository(db, 'restaurant');

    const resultTwo = repoRestaurant.add(new Restaurant('Ana', 'Istanbul'));
    log(`Restaurant added with ${resultTwo ? 'success' : 'fail'}`);

    repoRestaurant.add(new Restaurant('Bogazici', 'Istanbul'));
    repoRestaurant.add(new Restaurant('Cumhuriyet', 'Ankara'));
    repoRestaurant.add(new Restaurant('Deniz', 'Istanbul'));

    const restaurantsInIstanbul = repoRestaurant.getByCity('Istanbul');
    log('Restaurants in Istanbul:', JSON.stringify(restaurantsInIstanbul));
  }
}

/**
 * Initialize The App
 */

// eslint-disable-next-line no-new
new App();
