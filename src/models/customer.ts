export class Customer {
  private readonly age: number;

  private readonly name: string;

  constructor(name: string, age: number) {
    this.age = age;
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }
}
