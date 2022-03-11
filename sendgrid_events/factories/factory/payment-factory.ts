import { Visa } from './payment-providers/mastercard';
import {
  IPaymentProvider,
  PaymentProvider,
} from './payment-providers/type';
import { MasterCard } from './payment-providers/visa';

export class PaymentFactory {
  public static createPaymentType(
    type: PaymentProvider,
  ): IPaymentProvider {
    const providerSelector = {
      VISA: new Visa(),
      MASTERCARD: new MasterCard(),
    };

    return providerSelector[type];
  }
}
