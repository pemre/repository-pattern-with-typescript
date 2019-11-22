import { DummyQLConnector } from './lib/dummyql-connector'
import { Customer } from './models/customer'
import { Restaurant } from './models/restaurant'

/**
 * Repositories
 */

export abstract class BaseRepository<T> {
    // creating a property to use your code in all instances
    // that extends your base repository and reuse on methods of class
    public readonly db;
    private readonly repoName;

    constructor(db: DummyQLConnector, repoName: string) {
        this.db = db;
        this.db.addTable(repoName);
        this.repoName = repoName;
    }

    add(item: T): boolean {
        const result = this.db.create(this.repoName, item);
        return result;
    }

    getAll(): Array<T> {
        return this.db.all(this.repoName);
    }

    findBy(criteria, value): Array<T> {
        const returnOnlyFirstOne = false;
        return this.db.read(this.repoName, criteria, value, returnOnlyFirstOne);
    }
}

export class CustomerRepository extends BaseRepository<Customer> {
    // Here we can create db related methods of this repo
    getOldest(): Customer {
        return this
            .getAll()
            .reduce((l, e) => e.getAge() > l.getAge() ? e : l);
    }
}

export class RestaurantRepository extends BaseRepository<Restaurant> {
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
         * Use CustomerRepository
         */

        const repoCustomer = new CustomerRepository(db, 'customer');

        // Call create() method from BaseRepository
        const resultOne = repoCustomer.add(new Customer('Alice', 32));
        console.log(`Customer added with ${resultOne ? 'success' : 'fail'}`);

        repoCustomer.add(new Customer('Bob', 16));
        repoCustomer.add(new Customer('Carol', 48));
        repoCustomer.add(new Customer('Dave', 24));

        // Call a specific method from CustomerRepository
        const customerOldest = repoCustomer.getOldest();
        console.log(`The oldest customer is ${customerOldest.getName()}: Age ${customerOldest.getAge()}`);

        /**
         * Use RestaurantRepository
         */

        const repoRestaurant = new RestaurantRepository(db, 'restaurant');

        const resultTwo = repoRestaurant.add(new Restaurant('Ana', 'Istanbul'));
        console.log(`Restaurant added with ${resultTwo ? 'success' : 'fail'}`);

        repoRestaurant.add(new Restaurant('Bogazici', 'Istanbul'));
        repoRestaurant.add(new Restaurant('Cumhuriyet', 'Ankara'));
        repoRestaurant.add(new Restaurant('Deniz', 'Istanbul'));

        const restaurantsInIstanbul = repoRestaurant.getByCity('Istanbul');
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
