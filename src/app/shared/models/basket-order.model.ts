import { IBasketOrder } from '../interfaces/basket.interface';
import { IImage, IFabric, ISale } from '../interfaces/product.interface';
export class BasketOrder implements IBasketOrder {
  constructor(
    public category: string,
    public name: string,
    public images: IImage,
    public size: string,
    public description: string,
    public fabricComposition: IFabric,
    public price: number,
    public isSale: boolean,
    public sale: ISale,
    public count?: number,
  ) { }
}
