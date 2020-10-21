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
  p = 1;
  rSub: Subscription;
  products: Array<IProduct> = [];
  tSub: Subscription;
  type: string;
  loading: boolean;
  favorite = false;
  fSub: Subscription;
  showPagination = false;
  countOfPages: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productServ: ProductService
  ) {
    this.checkRout();
  }

  ngOnInit(): void {
    this.changeCount();
    this.tSub = this.productServ.type.subscribe(v => this.type = v);
    this.fSub = this.productServ.changedFilter.subscribe(() => {
      const category = this.route.snapshot.paramMap.get('category') || 'view-all';
      const type = JSON.parse(localStorage.getItem('type'));
      this.getProductsByCategory(type, category);
    });
  }

  private getProductsByCategory(type: string, category: string): void {
    this.changeCount();
    this.showPagination = false;
    this.loading = true;
    this.productServ.getProductByCategory(type, category).get().subscribe(val => {
      this.products = [];
      val.forEach(v => {
        const id = v.id;
        const data = v.data() as IProduct;
        this.products.push({ id, ...data });
      });
      this.p = 1;
      this.doFilter();
      this.loading = false;
      this.changeCount();
      setInterval(() => this.showPagination = true, 500);
    });
  }

  private doFilter(): void {
    const filters = JSON.parse(localStorage.getItem('filters'));
    if (filters && filters.length) {
      const filterName: string[] = [];
      let orderFilters = filters.map((f, i, filterArrName) => {
        filterName.push(filterArrName[i].name);
        return f.criteria.filter(criteria => criteria.active === true);
      }).map(arr => arr.map(v => v.name))
        .map((arr, i) => {
          return { name: filterName[i], arr };
        });
      const expandedFilters = {
        size: orderFilters.some(v => v.arr.length && v.name === 'size'),
        color: orderFilters.some(v => v.arr.length && v.name === 'color'),
        fabric: orderFilters.some(v => v.arr.length && v.name === 'fabric'),
      };
      localStorage.setItem('expandedPanels', JSON.stringify(expandedFilters));
      this.products = this.products
        .filter(product => {
          if (orderFilters.find(v => v.name === 'size').arr.length) {
            return orderFilters.some(fil => fil.name === 'size' ? fil.arr.some(el => product.size.some(size => size === el)) : false);
          } else {
            return product;
          }
        })
        .filter(product => {
          if (orderFilters.find(v => v.name === 'color').arr.length) {
            return orderFilters
              .some(fil => fil.name === 'color' ? fil.arr.some(el => product.images.some(v => v.color.colorName === el)) : false);
          } else {
            return product;
          }
        })
        .filter(product => {
          if (orderFilters.find(v => v.name === 'fabric').arr.length) {
            return orderFilters
              .some(fil => fil.name === 'fabric' ?
                fil.arr.some(el => product.fabricComposition.fabricTypes.some(v => v === el)) :
                false);
          } else {
            return product;
          }
        });

      orderFilters = [];

    }
  }

  private changeCount(): void {
    const count = JSON.parse(localStorage.getItem('countOfItems'));
    count ? this.countOfPages = count : this.countOfPages = 10;
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

  public pageChanged(event: number): void {
    this.showPagination = false;
    this.p = event;
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.showPagination = true;
    }, 500);

    this.changeCount();
  }

  public changeCountOfItems(event): void {
    this.countOfPages = +event.target.value;
    localStorage.setItem('countOfItems', JSON.stringify(this.countOfPages));
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
    if (this.fSub) {
      this.fSub.unsubscribe();
    }
  }

}
