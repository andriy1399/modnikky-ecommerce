import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { IBasketOrder } from '../../shared/interfaces/basket.interface';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  confirmation: {name: string, success: boolean, date: Date};
  products: IBasketOrder[] = [];
  totalPrice: number;
  defaultImage = 'https://media.giphy.com/media/PUYgk3wpNk0WA/giphy.gif';
  constructor() { }

  ngOnInit(): void {
    this.confirmation = JSON.parse(localStorage.getItem('confirmation'));
    this.products = JSON.parse(localStorage.getItem('orders'));
    this.totalPrice = this.products.reduce((acc, p) => acc + p.totalPrice, 0);
  }



  ngOnDestroy(): void {
    localStorage.removeItem('orders');
    localStorage.removeItem('confirmation');
  }

}
