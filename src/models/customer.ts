export class Customer {
  private age: number;

  private name: string;

  constructor(name: string, age: number) {
    this.age = age;
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getAge() {
    return this.age;
  }
}
