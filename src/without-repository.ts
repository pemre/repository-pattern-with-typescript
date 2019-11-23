// eslint-disable-next-line max-classes-per-file
import { Customer } from './models/customer';
import { Restaurant } from './models/restaurant';
import { DummyQLConnector } from './lib/dummyql-connector';
import { log } from './lib/helpers';

/**
 * Controllers
 */

export class CustomerController {
  public readonly db;

  private readonly table;

  constructor(db: DummyQLConnector) {
    this.db = db;
    this.table = 'customer';
    this.db.addTable(this.table);
  }

  add(customer: Customer): boolean {
    return this.db.create(this.table, customer);
  }

  getAll(): Array<Customer> {
    return this.db.all(this.table);
  }

  getOldest(): Customer {
    return this
      .getAll()
      .reduce((l, e) => (e.getAge() > l.getAge() ? e : l));
  }
}

export class RestaurantController {
  public readonly db;

  private readonly table;

  constructor(db: DummyQLConnector) {
    this.db = db;
    this.table = 'customer';
    this.db.addTable(this.table);
  }

  add(restaurant: Restaurant): boolean {
    return this.db.create(this.table, restaurant);
  }

  findBy(criteria: string, value: string): Array<Restaurant> {
    const returnOnlyFirstOne = false;
    return this.db.read(this.table, criteria, value, returnOnlyFirstOne);
  }

  getByCity(name: string): Array<Restaurant> {
    return this.findBy('city', name);
  }
}

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
     * Use CustomerController
     */

    const contCustomer = new CustomerController(db);

    // Call create() method from BaseRepository
    const resultOne = contCustomer.add(new Customer('Alice', 32));
    log(`Customer added with ${resultOne ? 'success' : 'fail'}`);

    contCustomer.add(new Customer('Bob', 16));
    contCustomer.add(new Customer('Carol', 48));
    contCustomer.add(new Customer('Dave', 24));

    // Call a specific method from CustomerController
    const customerOldest = contCustomer.getOldest();
    log(`The oldest customer is ${customerOldest.getName()}: Age ${customerOldest.getAge()}`);

    /**
     * Use RestaurantController
     */

    const contRestaurant = new RestaurantController(db);

    const resultTwo = contRestaurant.add(new Restaurant('Ana', 'Istanbul'));
    log(`Restaurant added with ${resultTwo ? 'success' : 'fail'}`);

    contRestaurant.add(new Restaurant('Bogazici', 'Istanbul'));
    contRestaurant.add(new Restaurant('Cumhuriyet', 'Ankara'));
    contRestaurant.add(new Restaurant('Deniz', 'Istanbul'));

    const restaurantsInIstanbul = contRestaurant.getByCity('Istanbul');
    log('Restaurants in Istanbul:', restaurantsInIstanbul);
  }
}

/**
 * Initialize The App
 */

// eslint-disable-next-line no-new
new App();
