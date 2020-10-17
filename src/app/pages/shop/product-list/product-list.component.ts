import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../shared/services/product.service';
import { IProduct } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  rSub: Subscription;
  products: Array<IProduct> = [];
  tSub: Subscription;
  type: string;
  loading: boolean;
  favorite = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productServ: ProductService
  ) {
    this.checkRout();
  }

  ngOnInit(): void {
    this.tSub = this.productServ.type.subscribe(v => this.type = v);
  }

  private getProductsByCategory(type: string, category: string): void {
    this.loading = true;
    this.productServ.getProductByCategory(type, category).get().subscribe(val => {
      this.products = [];
      val.forEach(v => {
        const id = v.id;
        const data = v.data() as IProduct;
        this.products.push({ id, ...data });
      });
      this.products.sort((a: any, b: any) => a.dateAdded - b.dateAdded);
      this.loading = false;
    });
  }
  private checkRout(): void {
    this.rSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const type = this.type || this.router.url.split('/')[2];
        const category = this.route.snapshot.paramMap.get('category') || 'view-all';
        this.getProductsByCategory(type, category);
      }
    });
  }

  test(): void {
    console.log('test');
    this.favorite = !this.favorite;
  }

  ngOnDestroy(): void {
    if (this.rSub) {
      this.rSub.unsubscribe();
    }

    if (this.tSub) {
      this.tSub.unsubscribe();
    }
  }

}
