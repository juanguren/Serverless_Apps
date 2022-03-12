import { IPaymentProvider } from './type';

export class Visa implements IPaymentProvider {
  public readonly name = 'Visa';

  commission(value: number): number {
    return value * 0.03;
  }
}
