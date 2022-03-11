import { IPaymentProvider } from './type';

export class MasterCard implements IPaymentProvider {
  public readonly name = 'MasterCard';

  commission(value: number): number {
    return value * 0.035;
  }
}
