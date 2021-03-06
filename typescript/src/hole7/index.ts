export default class TakeHomeCalculator {
  constructor(private readonly taxRate: TaxRate) {
    this.taxRate = taxRate;
  }

  netAmount(first: Money, ...rest: Money[]): Money {
    const total = rest.reduce((acc, money) => acc.plus(money), first);
    const tax = this.taxRate.apply(total);
    return total.minus(tax);
  }
}

export class Incalculable extends Error { }

export class Money {
  value: number;
  currency: string;

  private constructor(value: number, currency: string) {
    this.value = value;
    this.currency = currency;
  }

  static money(value: number, currency: string) {
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

export class TaxRate {
  private constructor(private readonly percent: number) {
    this.percent = percent;
  }

  static taxRate(percent: number): TaxRate {
    return new TaxRate(percent);
  }

  apply(total: Money) {
    const amount: number = total.value * (this.percent / 100);
    return Money.money(amount, total.currency);
  }
}
