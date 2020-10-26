import { Component, OnInit } from '@angular/core';
import { IBasketOrder } from '../../shared/interfaces/basket.interface';
import { ProductService } from '../../shared/services/product.service';
import { IMyInformation } from '../../shared/interfaces/my-information.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IOrder } from '../../shared/interfaces/order.interface';
import { OrderService } from '../../shared/services/order.service';
import { Router } from '@angular/router';

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
  user: IMyInformation;
  information: FormGroup;
  userData: IMyInformation;
  constructor(
    private productServ: ProductService,
    private orderServ: OrderService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userCredential'));
    this.getBagProducts();
    if (this.user) {
      this.getUser();
    }
    this.information = new FormGroup({
      firstName: new FormControl(this.user ? this.user.firstName : '', [
        Validators.required,
        Validators.minLength(3)
      ]),
      lastName: new FormControl(this.user ? this.user.lastName : '', [
        Validators.required,
        Validators.minLength(3)
      ]),
      phone: new FormControl(this.user ? this.user.telephone1 : '', [
        Validators.required,
        Validators.pattern(/\+?3?8?(0[5-9][0-9]\d{7})/)
      ]),
      comment: new FormControl('')
    });
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
  private getUser(): void {
    this.orderServ.getUser(this.user).get().subscribe(val => {
      val.forEach(v => {
        const uId = v.id;
        const data = v.data() as IMyInformation;
        this.userData = { uId, ...data };
      });
    });

  }

  sendOrder(): void {
    if (this.user && this.user.role !== 'admin') {
      const { uId, city, street, build, flour, aboutMyself, apartment, dateOfBirthday, telephone2, email } = this.user;

      const order: IOrder = {
        uId,
        city,
        street,
        flour,
        aboutMyself,
        apartment,
        dateOfBirthday,
        build,
        telephone1: this.information.value.phone,
        telephone2,
        email,
        firstName: this.information.value.firstName,
        lastName: this.information.value.lastName,
        order: this.bag,
        dateOfOrdering: new Date(),
        price: +(this.totalPrice).toFixed(2),
        comment: this.information.value.comment || null
      };

      let { historyOfOrders } = this.userData;
      if (historyOfOrders && historyOfOrders.length) {
        historyOfOrders.push({ orders: this.bag, date: new Date() });
      } else {
        historyOfOrders = [{ orders: this.bag, date: new Date() }];
      }
      this.orderServ.addOrder(order)
        .then(() => {

          localStorage.setItem('confirmation', JSON.stringify({
            success: true,
            name: this.information.value.firstName,
            date: new Date()
          }));
          this.router.navigateByUrl('confirmation');
          this.productServ.bag.next(0);
          this.isMakeCheckout = false;
        });

      this.orderServ.updateInformation({
        ...this.user,
        firstName: this.information.value.firstName,
        lastName: this.information.value.lastName,
        telephone1: this.information.value.phone,
        historyOfOrders
      });
    } else {
      const order: IOrder = {
        telephone1: this.information.value.phone,
        firstName: this.information.value.firstName,
        lastName: this.information.value.lastName,
        order: this.bag,
        dateOfOrdering: new Date(),
        price: +(this.totalPrice).toFixed(2),
        comment: this.information.value.comment || null
      };
      this.orderServ.addOrder(order)
        .then(() => {
          localStorage.setItem('confirmation', JSON.stringify({
            success: true,
            name: this.information.value.firstName,
            date: new Date()
          }));
          this.router.navigateByUrl('confirmation');
          this.productServ.bag.next(0);
          this.isMakeCheckout = false;
        });
    }

  }

}
