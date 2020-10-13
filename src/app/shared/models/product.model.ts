import { IProduct, IImage, IFabric, ISale } from '../interfaces/product.interface';
export class Product implements IProduct {
  constructor(
    public category: string,
    public name: string,
    public images: Array<IImage>,
    public size: Array<string>,
    public description: string,
    public fabricComposition: IFabric,
    public price: number,
    public isSale: boolean,
    public isNewArrivals: boolean,
    public dateAdded: Date,
    public sale?: ISale,
    public dateOfEdition?: Date,
  ) { }
}
