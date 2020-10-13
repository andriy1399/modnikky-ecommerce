export interface IColor {
  colorHex: string;
  colorName: string;
}
export interface IFabric {
  fabricText: string;
  fabricTypes: Array<string>;
}

export interface IImage {
  images: string[];
  color: IColor;
}
export interface ISale {
  percents: string;
  dollars: number;
  priceWithDiscount: number;
}
export interface IProduct {
  category: string;
  name: string;
  images: Array<IImage>;
  size: Array<string>;
  description: string;
  fabricComposition: IFabric;
  price: number;
  isSale: boolean;
  isNewArrivals: boolean;
  dateAdded: Date;
  sale?: ISale ;
  dateOfEdition?: Date;
  id?: string;
}
