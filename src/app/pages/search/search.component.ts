import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../shared/interfaces/product.interface';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  sSub: Subscription;
  products: IProduct[] = [];
  p: number;
  countOfPages: number;
  defaultImg = 'https://media.giphy.com/media/PUYgk3wpNk0WA/giphy.gif';
  defaultName = '';
  searchIsEmpty = true;
  searchWord = '';
  uSub: Subscription;
  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit(): void {
    this.defaultName = JSON.parse(localStorage.getItem('searchName'));
    this.changeCount();
    this.searchProducts();
    this.sSub = this.productServ.search.subscribe(text => {
      this.searchWord = text;
      this.searchProducts(text);
      localStorage.setItem('searchName', JSON.stringify(text));
    });
  }

  private searchProducts(search: string = this.defaultName): void {
    console.log(search);
    this.uSub = this.productServ.getProducts().subscribe(data => {
      const items: IProduct[] = data.map(el => {
        const d = el.payload.doc.data();
        const id = el.payload.doc.id;
        return { id, ...d as IProduct };
      });

      this.products = items.filter(v => v.searchName.includes(search));
      if (!this.products || !this.products.length) {
        this.searchIsEmpty = true;
      } else {
        this.searchIsEmpty = false;
      }
    });
  }

  public changeCountOfItems(event): void {
    this.countOfPages = +event.target.value;
    localStorage.setItem('countOfItems', JSON.stringify(this.countOfPages));
  }

  private changeCount(): void {
    const count = JSON.parse(localStorage.getItem('countOfItems'));
    count ? this.countOfPages = count : this.countOfPages = 10;
  }

  public pageChanged(event: number): void {
    this.p = event;
    window.scrollTo(0, 0);
    this.changeCount();
  }

  ngOnDestroy(): void {
    if (this.sSub) {
      this.sSub.unsubscribe();
    }
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
    localStorage.removeItem('searchName');
  }
}
