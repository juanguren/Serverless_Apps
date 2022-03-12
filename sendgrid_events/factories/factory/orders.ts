// Classify the payment commission by payment provider

import { PaymentFactory } from './payment-factory';
import {
  IPaymentProvider,
  PaymentProviders,
} from './payment-providers/type';

export class Order {
  public id: string;
  public comission: number = 0;
  public paymentProvider: IPaymentProvider;
  public paymentStatus: PaymentComplete;

  constructor(
    private provider: PaymentProviders,
    public amount: number,
  ) {}

  public create(): void {
    this.paymentProvider = PaymentFactory.createPaymentType(
      this.provider,
    );

    this.comission = this.paymentProvider.commission(this.amount);
  }
}
