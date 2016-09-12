import { AmpCurrencyPipe } from './amp-currency.pipe';

describe('AmpCurrencyPipe', () => {

  let pipe: AmpCurrencyPipe;

  beforeEach(() => {
    pipe = new AmpCurrencyPipe();
  });

  it('transforms 10 to $10', () => {
    expect(pipe.transform('10')).toEqual('$10');
  });

  it('transforms 10 to $10.00', () => {
    expect(pipe.transform('10', 2)).toEqual('$10.00');
  });

  it('transforms 10000 to $10,000', () => {
    expect(pipe.transform('10000', 0, 3)).toEqual('$10,000');
  });
});
