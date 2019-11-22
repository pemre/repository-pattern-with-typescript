import { DummyQLConnector } from './lib/dummyql-connector'
import { Customer } from './models/customer'
import { Restaurant } from './models/restaurant'

/**
 * Controllers
 */

export class CustomerController<Customer> {
    public readonly db;
    private readonly table;

    constructor(db: DummyQLConnector) {
        this.db = db;
        this.table = 'customer';
        this.db.addTable(this.table);
    }

    add(customer: Customer): boolean {
        const result = this.db.create(this.table, customer);
        return result;
    }

    getAll(): Array<Customer> {
        return this.db.all(this.table);
    }

    // Here we can create db related methods of this repo
    getOldest(): Customer {
        return this
            .getAll()
            .reduce((l, e) => e.getAge() > l.getAge() ? e : l);
    }
}

export class RestaurantController<Restaurant> {
    public readonly db;
    private readonly table;

    constructor(db: DummyQLConnector) {
        this.db = db;
        this.table = 'customer';
        this.db.addTable(this.table);
    }

    add(restaurant: Restaurant): boolean {
        const result = this.db.create(this.table, restaurant);
        return result;
    }

    findBy(criteria, value): Array<Restaurant> {
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
        // Connecting to database
        const db = new DummyQLConnector();

        /**
         * Use CustomerController
         */

        const contCustomer = new CustomerController(db);

        // Call create() method from BaseRepository
        const resultOne = contCustomer.add(new Customer('Alice', 32));
        console.log(`Customer added with ${resultOne ? 'success' : 'fail'}`);

        contCustomer.add(new Customer('Bob', 16));
        contCustomer.add(new Customer('Carol', 48));
        contCustomer.add(new Customer('Dave', 24));

        // Call a specific method from CustomerController
        const customerOldest = contCustomer.getOldest();
        console.log(`The oldest customer is ${customerOldest.getName()}: Age ${customerOldest.getAge()}`);

        /**
         * Use RestaurantController
         */

        const contRestaurant = new RestaurantController(db);

        const resultTwo = contRestaurant.add(new Restaurant('Ana', 'Istanbul'));
        console.log(`Restaurant added with ${resultTwo ? 'success' : 'fail'}`);

        contRestaurant.add(new Restaurant('Bogazici', 'Istanbul'));
        contRestaurant.add(new Restaurant('Cumhuriyet', 'Ankara'));
        contRestaurant.add(new Restaurant('Deniz', 'Istanbul'));

        const restaurantsInIstanbul = contRestaurant.getByCity('Istanbul');
        console.log(`Restaurants in Istanbul:`, restaurantsInIstanbul);

        this.renderSomething();
    }

    renderSomething() {
        document.getElementById('app').innerHTML = `
            <h1>Repository Pattern with Typescript</h1>
            <div>
              Please check console log!
              Click
              <a
                  href="https://github.com/pemre/repository-pattern-with-typescript"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                  here
              </a>
              for more info about this tutorial.
            </div>
        `;
    }
}

/**
 * Initialize The App
 */

const app = new App();
