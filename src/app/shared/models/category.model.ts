export class Category {
  constructor(
    public name: string,
    public showShop: boolean,
    public showNewArrivals: boolean,
    public showSale: boolean,
    public id?: string
  ) {}
}
