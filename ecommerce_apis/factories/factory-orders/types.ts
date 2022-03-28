export enum OrderStatus {
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  PENDING = 'pending',
}

export interface IOrder {
  id: string;
  items: object[];
  totalPrice: number;
  paymentStatus: OrderStatus;
}
