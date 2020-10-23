import { IBasketOrder } from './basket.interface';
import { IMyInformation } from './my-information.interface';
export interface IOrder extends IMyInformation {
  order: Array<IBasketOrder>;
  dateOfOrdering: Date;
  price: number;
  comment?: string;
  orderId?: string;
}
