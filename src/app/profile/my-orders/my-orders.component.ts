import { Component, OnInit } from '@angular/core';
import { IMyInformation } from 'src/app/shared/interfaces/my-information.interface';
import { OrderService } from 'src/app/shared/services/order.service';
import { IHistory } from '../../shared/interfaces/my-information.interface';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  userCredential: IMyInformation;
  user: IMyInformation;
  total: number[];
  constructor(
    private orderServ: OrderService
  ) { }

  ngOnInit(): void {
    this.userCredential = JSON.parse(localStorage.getItem('userCredential'));
    this.getUser();
  }

  private getUser(): void {
    this.total = [];
    this.orderServ.getUser(this.userCredential).get().subscribe(val => {
      val.forEach(v => {
        const uId = v.id;
        const data = v.data() as IMyInformation;
        this.user = { uId, ...data };
      });
      if (this.user.historyOfOrders && this.user.historyOfOrders.length) {
        this.user.historyOfOrders.forEach((v) => {
          const price = v.orders.reduce((t, a) => t + a.totalPrice, 0);
          this.total.push(price);
        });
      }
    });

  }
}
