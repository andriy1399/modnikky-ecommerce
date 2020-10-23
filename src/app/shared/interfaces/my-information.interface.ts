import { IBasketOrder } from './basket.interface';
export interface IHistory {
  orders: IBasketOrder[];
  date: Date;
}
export interface IMyInformation {
  firstName: string;
  lastName: string;
  email?: string;
  id?: string;
  uId?: string;
  role?: string;
  success?: boolean;
  telephone1?: string;
  telephone2?: string;
  dateOfBirthday?: Date;
  city?: string;
  street?: string;
  build?: string;
  flour?: number;
  apartment?: number;
  aboutMyself?: string;
  historyOfOrders?: IHistory[];
}
