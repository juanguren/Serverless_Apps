// Classify the payment commission by payment provider

import { PaymentProvider } from './payment-providers/type';

export class Order {
  public id: string;
  public paymentProvider: PaymentProvider;
  public paymentStatus: PaymentComplete;

  constructor(private type: string, public amount: number) {}

  public create(): void {}
}
