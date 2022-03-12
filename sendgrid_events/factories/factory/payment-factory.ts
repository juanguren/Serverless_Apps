import {
  IPaymentProvider,
  PaymentProviders,
} from './payment-providers/type';
import { Visa } from './payment-providers/mastercard';
import { MasterCard } from './payment-providers/visa';

export class PaymentFactory {
  public static createPaymentType(
    provider: PaymentProviders,
  ): IPaymentProvider {
    const providerSelector = {
      VISA: new Visa(),
      MASTERCARD: new MasterCard(),
    };

    return providerSelector[provider];
  }
}
