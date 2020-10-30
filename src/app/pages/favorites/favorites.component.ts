import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IBasketOrder } from 'src/app/shared/interfaces/basket.interface';
import { BasketOrder } from 'src/app/shared/models/basket-order.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: Array<IBasketOrder> = [];
  countItems = 0;
  constructor(
    private productsServ: ProductService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Favorites products | Modnikky');
    this.getFavoritesProducts();
  }
  private getFavoritesProducts(): void {
    this.favorites = JSON.parse(localStorage.getItem('favorites'));
    if (this.favorites && this.favorites.length) {
      this.countItems = this.favorites.reduce((acc, n) => acc + n.count, 0);
    } else {
      this.countItems = 0;
    }
  }

  removeFavoritesProduct(prod: IBasketOrder, index: number): void {
    this.favorites = this.favorites.filter((_, i) => i !== index);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    let favoritesIds = JSON.parse(localStorage.getItem('favoritesIds'));
    favoritesIds = favoritesIds.filter(v => v !== prod.id + prod.images.color.colorHex + prod.size);
    localStorage.setItem('favoritesIds', JSON.stringify(favoritesIds));
    this.getFavoritesProducts();
    if (!this.favorites.length) {
      localStorage.removeItem('favorites');
    }
    if (!favoritesIds.length) {
      localStorage.removeItem('favoritesIds');
    }
  }

  addToBag(prod: IBasketOrder): void {
    const product = new BasketOrder(
      prod.category,
      prod.name,
      prod.images,
      prod.size,
      prod.description,
      prod.fabricComposition,
      prod.price,
      prod.isSale,
      prod.sale,
      1,
      prod.isSale ? +prod.sale.priceWithDiscount : prod.price,
      prod.id,
      prod.isNewArrivals
    );
    let orders = JSON.parse(localStorage.getItem('orders'));
    if (orders && orders.length) {
      const orderInBag = orders.findIndex((v: IBasketOrder) => {
        return v.name === prod.name &&
          v.images.color.colorHex === prod.images.color.colorHex &&
          v.size === prod.size;
      });
      if (orderInBag !== -1) {
        orders[orderInBag].count++;
        localStorage.setItem('orders', JSON.stringify(orders));
      } else {
        localStorage.setItem('orders', JSON.stringify([product, ...orders]));
      }
    } else {
      localStorage.setItem('orders', JSON.stringify([product]));
    }
    orders = JSON.parse(localStorage.getItem('orders'));
    this.productsServ.bag.next(orders.reduce((acc, n) => acc + n.count, 0));
    this.productsServ.bagModalShow.next(true);
  }
}
