export class Incalculable extends Error {}

export default class TakeHomeCalculator {
  constructor(private readonly percent: number) {
    this.percent = percent;
  }

  netAmount(first: Money, ...rest: Money[]): Money {
    const monies: Money[] = rest;

    let total: Money = first;

    monies.forEach((next: Money) => {
      total = total.plus(next);
    });

    const amount: number = total.value * (this.percent / 100);

    const tax: Money = new Money(amount, first.currency);

    return total.minus(tax);
  }
}

export class Money {
  value: number;
  currency: string;

  constructor(value: number, currency: string) {
    this.value = value;
    this.currency = currency;
  }

  private static money(value: number, currency: string) {
    return new Money(value, currency);
  }

  plus(other: Money): Money {
    if (!(other.currency === this.currency)) {
      throw new Incalculable();
    }
    return new Money(this.value + other.value, other.currency);
  }

  minus(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Incalculable();
    }
    return Money.money(this.value - other.value, this.currency);
  }
}