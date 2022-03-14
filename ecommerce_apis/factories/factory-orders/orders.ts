// Classify the payment commission by payment provider

import {
  IPaymentProvider,
  PaymentProviders,
} from './payment-providers/type';
import { PaymentFactory } from './payment-factory';
import getJsonApiData from '../../services/json-promise.service';
import { nanoid } from 'nanoid';

interface IOrder {
  id: string;
  items: object[];
  totalPrice: number;
  paymentStatus: PaymentComplete;
}

export class Order {
  public id: string;
  public comission: number = 0;
  public items: object[] = [];
  public paymentProvider: IPaymentProvider;
  public paymentStatus: PaymentComplete;

  constructor(
    private provider: PaymentProviders,
    public itemIds: number[],
  ) {
    this.id = nanoid();
    this.paymentStatus = 'unknown';
  }

  public async create(): Promise<IOrder> {
    try {
      // Selects the provider using the factory class
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
