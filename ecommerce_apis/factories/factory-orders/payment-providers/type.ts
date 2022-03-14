export interface IPaymentProvider {
  commission: Commission;
}

export interface Commission {
  (value: number): number;
}

export enum PaymentProviders {
  Visa = 'VISA',
  MasterCard = 'MASTERCARD',
}
