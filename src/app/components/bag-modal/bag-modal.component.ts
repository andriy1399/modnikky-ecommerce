import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { IBasketOrder } from '../../shared/interfaces/basket.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bag-modal',
  templateUrl: './bag-modal.component.html',
  styleUrls: ['./bag-modal.component.scss'],
})
export class BagModalComponent implements OnInit, OnDestroy {
  bag: IBasketOrder[] = [];
  countItems = 0;
  totalPrice = 0;
  constructor(
    private productServ: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
    this.getBagProducts();
  }
  closeModal(): void {
    this.productServ.bagModalShow.next(false);
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

  public removeProduct(index: number): void {
    this.bag = this.bag.filter((_, i) => i !== index);
    localStorage.setItem('orders', JSON.stringify(this.bag));
    this.getBagProducts();
    if (!this.bag.length) {
      localStorage.removeItem('orders');
      this.productServ.bagModalShow.next(false);
    }
  }

  public viewBag(): void {
    this.productServ.bagModalShow.next(false);
    this.router.navigateByUrl('bag');
  }
  ngOnDestroy(): void {
    setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 1000);
  }
}
