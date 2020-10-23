import { Component, OnInit } from '@angular/core';
import { IBasketOrder } from '../../shared/interfaces/basket.interface';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.scss']
})
export class BagComponent implements OnInit {
  bag: Array<IBasketOrder> = [];
  countItems = 0;
  totalPrice = 0;
  isMakeCheckout = false;
  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit(): void {
    this.getBagProducts();
  }
  public incrementAndDecrement(product: IBasketOrder, increment = true): void {
    if (product.count === 1 && !increment) {
      product.count = 1;
    }
    else if (product.count > 0 && product.count < 16) {
      if (product.isSale) {
        product.totalPrice = product.sale.priceWithDiscount * (increment ? ++product.count : --product.count);
      } else {
        product.totalPrice = product.price * (increment ? ++product.count : --product.count);
      }
      localStorage.setItem('orders', JSON.stringify(this.bag));
      this.countItems = this.bag.reduce((acc, n) => acc + n.count, 0);
      this.totalPrice = this.bag.reduce((acc, p) => acc + p.totalPrice, 0);
      this.productServ.bag.next(this.countItems);
    }
  }
  private getBagProducts(): void {
    this.bag = JSON.parse(localStorage.getItem('orders'));
    if (this.bag && this.bag.length) {
      this.countItems = this.bag.reduce((acc, n) => acc + n.count, 0);
      this.totalPrice = this.bag.reduce((acc, p) => acc + p.totalPrice, 0);
    } else {
      this.countItems = 0;
      this.totalPrice = 0;
    }
    this.productServ.bag.next(this.countItems);
  }

  removeBagProduct(index: number): void {
    this.bag = this.bag.filter((_, i) => i !== index);
    localStorage.setItem('orders', JSON.stringify(this.bag));
    this.getBagProducts();
    if (!this.bag.length) {
      localStorage.removeItem('orders');
    }
  }
}
