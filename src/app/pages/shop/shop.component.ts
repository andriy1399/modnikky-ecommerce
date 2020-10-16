import { Component, OnInit, OnDestroy, SimpleChanges, OnChanges, TrackByFunction } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { ICategory } from '../../shared/interfaces/category.interface';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FiltersService } from '../../shared/services/filters.service';
import { IFilter } from '../../shared/interfaces/filter.interface';
import { IPanelFilter } from '../../shared/interfaces/panel.interface';
import { MatAccordionDisplayMode } from '@angular/material/expansion';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {
  categories: Array<ICategory> = [];
  type: string;
  routUrl: string;
  rSub: Subscription;
  filters: Array<IPanelFilter> = [];
  constructor(
    private categoryServ: CategoryService,
    private router: Router,
    private filterServ: FiltersService,
    private route: ActivatedRoute,
    private productServ: ProductService
  ) {
    this.checkRoute();
  }



  ngOnInit(): void {
    this.getCategory(this.routUrl);
    this.getFilters();
  }
  private getFilters(): void {
    this.filterServ.getFilters()
      .subscribe(data => {
        const dataFilters: IFilter[] = data.map(e => {
          const id = e.payload.doc.id;
          const otherData = e.payload.doc.data() as IFilter;
          return { id, ...otherData };
        });
        this.filters = dataFilters.map(filter => {
          return {
            criteria: filter.criteria.map(v => {
              return { active: false, name: v };
            }),
            name: filter.name,
            id: filter.id
          };
        });
      });
  }

  public setFilterChange(checkbox: { active: boolean, name: string }, filter: IPanelFilter): void {
    this.filters = this.filters.map(val => {
      if (val.name === filter.name) {
        return {
          criteria: val.criteria.map(v => {
            if (v.name === checkbox.name) {
              return { active: !v.active, name: v.name };
            } else {
              return v;
            }
          }),
          name: val.name,
          id: val.id,
        };
      } else {
        return val;
      }
    });

  }

  private checkRoute(): void {
    this.rSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const type = this.route.snapshot.paramMap.get('type');
        this.routUrl = type;
        this.productServ.type.next(type);
        if (event.id === 1 || event.url.split('/').length === 3) {
          this.getCategory(type);
          this.getFilters();
        }
      }
    });
  }

  private getCategory(type): void {
    this.type = type;
    let formatType: string;
    switch (type) {
      case 'shop':
        formatType = 'showShop';
        break;
      case 'new-arrivals':
        formatType = 'showNewArrivals';
        break;
      case 'sale':
        formatType = 'showSale';
        break;
      default:
        break;
    }
    this.categories = [];
    if (formatType) {
      const categories = this.categoryServ.getCorrectCategory(formatType);
      categories.subscribe(data => {
        this.categories = [];
        data.forEach(category => {
          this.categories.push((category as ICategory));
        });
      }, err => console.log(err));
    }
  }
  trackByFn: TrackByFunction<IPanelFilter> = (_, item) => item.id;

  ngOnDestroy(): void {
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }
}
