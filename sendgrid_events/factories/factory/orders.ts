// Classify the payment commission by payment provider

export class Order {
  public id: string;
  public paymentProvider: string;

  constructor(private type: string, public amount: number) {}

  public create(): void {}
}
