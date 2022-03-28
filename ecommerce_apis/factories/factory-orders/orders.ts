// Classify the payment commission by payment provider

import {
  IPaymentProvider,
  PaymentProviders,
} from './payment-providers/type';
import { PaymentFactory } from './payment-factory';
import getJsonApiData from '../../services/json-promise.service';
import { nanoid } from 'nanoid';
import { IOrder, OrderStatus } from './types';

export class Order {
  public id: string;
  public comission: number = 0;
  public items: object[] = [];
  public paymentProvider: IPaymentProvider;
  public paymentStatus: OrderStatus;

  constructor(
    private provider: PaymentProviders,
    public itemIds: number[],
  ) {
    this.id = nanoid();
    this.paymentStatus = OrderStatus.PENDING;
  }

  public async create(): Promise<IOrder> {
    try {
      // Selects the provider using the factory class
      // ! TODO: Handle the error in case a non-existant provider is set
      this.paymentProvider = PaymentFactory.getPaymentProvider(
        this.provider,
      );
      this.items = await this.getItems(this.itemIds);

      const itemAmmount = this.items.length;
      // Executes the commission calculation (in the provider class)
      this.comission = this.paymentProvider.commission(itemAmmount);

      return {
        id: this.id,
        items: this.items,
        totalPrice: this.comission + itemAmmount,
        paymentStatus: this.paymentStatus,
      };
    } catch (error) {
      throw error;
    }
  }

  private async getItems(references: number[]): Promise<object[]> {
    const items = await getJsonApiData(references);

    return items;
  }
}
