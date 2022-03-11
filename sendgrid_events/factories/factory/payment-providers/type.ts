export interface IPaymentProvider {
  commission: Commission;
}

export interface Commission {
  (value: number): number;
}
