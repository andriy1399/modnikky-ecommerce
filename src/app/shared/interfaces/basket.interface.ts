import { IFabric, IImage, ISale } from './product.interface';
export interface IBasketOrder {
  category: string;
  name: string;
  images: IImage;
  size: string;
  description: string;
  fabricComposition: IFabric;
  price: number;
  isSale: boolean;
  sale: ISale;
  count?: number;
  totalPrice?: number;
}

