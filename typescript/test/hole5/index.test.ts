import * as should from 'should';
import TakeHomeCalculator, {Incalculable, Money} from '../../src/hole5';

describe('Hole 5: Take Home Calculator should', () => {
  it('calculate tax', async () => {
    const first = new TakeHomeCalculator(10).netAmount(
      Money.money(40, 'GBP'),
      Money.money(50, 'GBP'),
      Money.money(60, 'GBP')
    ).value;
    first.should.equal(135);
  });

  it('fail to sum different currencies', () => {
    should.throws(
      () =>
        new TakeHomeCalculator(10).netAmount(
          Money.money(4, 'GBP'),
          Money.money(5, 'USD')
        ),
      Incalculable
    );
  });
});
