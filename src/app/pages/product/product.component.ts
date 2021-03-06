import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct, IImage } from '../../shared/interfaces/product.interface';
import { IPanel } from '../../shared/interfaces/panel.interface';
import { IBreadcrumb } from '../../shared/interfaces/breadcrumb.interface';
import { SwiperOptions } from 'swiper';
import { BasketOrder } from '../../shared/models/basket-order.model';
import { IBasketOrder } from '../../shared/interfaces/basket.interface';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  defaultImage = 'https://media.giphy.com/media/PUYgk3wpNk0WA/giphy.gif';

  product: IProduct;
  showImgArr: string[] = [];
  panelDescription: IPanel;
  panelComposition: IPanel;
  panelDelivery: IPanel = deliveryAndPayment;
  type: string;
  breadcrumb: IBreadcrumb;
  completeLook: [IProduct, IProduct];
  moreProducts: Array<IProduct> = [];
  innerWidth: number;

  swiperConfig: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };
  productImages: IImage;
  orderSize: string;
  favoritesIds: string[] = [];
  constructor(
    private productsServ: ProductService,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.getProduct();
    this.favoritesIds = JSON.parse(localStorage.getItem('favoritesIds'));
  }

  changeProductModel(color: IImage): void {
    this.showImgArr = color.images;
    this.productImages = color;
    window.scrollTo(0, 0);
  }
  orderProductSize(size: string): void {
    this.orderSize = size;
  }
  private getProduct(productId?: string): void {
    const prodId = this.route.snapshot.paramMap.get('id');
    this.productsServ.getProductById(productId || prodId).get()
      .then(doc => {
        if (doc.exists) {
          const id = doc.id;
          const data = doc.data() as IProduct;
          this.getBreadcrumb(data);
          this.getRandomProducts({ ...data, id });
          this.product = { ...data, id };
          this.panelDescription = { pTitle: 'Product description', pText: data.description } as IPanel;
          this.panelComposition = { pTitle: 'Fabric composition', pText: data.fabricComposition.fabricText } as IPanel;
          this.title.setTitle(`${this.product.name} - ${this.product.category} | ${this.breadcrumb.type || '-'} | Modnikky`);
          this.meta.addTags([
            { name: 'keywords', content: `${this.product.name}, ${this.product.category}, ${this.breadcrumb.type}, modnikky, shop` },
            { name: 'description', content: this.product.description }
          ]);
        }
      }).catch(err => console.log(err));
  }

  private getRandomProducts(prod: IProduct): void {
    this.product = null;
    let products: IProduct[];
    this.productsServ.getProducts()
      .subscribe(data => {
        products = data.map(e => {
          const id = e.payload.doc.id;
          const otherData = e.payload.doc.data() as IProduct;
          return { id, ...otherData };
        });
        products = products.filter((v, i) => v.id !== prod.id);
        this.completeLook = [products[0], products[1]];
        products = products.filter((v, i) => v.id !== prod.id && i < 12).sort((a: any, b: any) => a.dateAdded + b.dateAdded);
        this.moreProducts = products.filter(v => v.id !== this.completeLook[0].id && v.id !== this.completeLook[1].id);
      });

  }

  public updateProduct(id: string): void {
    this.showImgArr = [];
    this.productImages = null;
    this.getProduct(id);
    localStorage.setItem('type', JSON.stringify('shop'));
  }
  private getBreadcrumb(product: IProduct): void {
    const type = JSON.parse(localStorage.getItem('type'));
    this.breadcrumb = {
      type,
      category: product.category,
      name: product.name
    };
  }

  addToFavorites(): void {
    const product = new BasketOrder(
      this.product.category,
      this.product.name,
      this.productImages || this.product.images[0],
      this.orderSize || this.product.size[0],
      this.product.description,
      this.product.fabricComposition,
      this.product.price,
      this.product.isSale,
      this.product.sale,
      1,
      this.product.isSale ? +this.product.sale.priceWithDiscount : this.product.price,
      this.product.id,
      this.product.isNewArrivals,
    );

    let favorites = JSON.parse(localStorage.getItem('favorites'));

    if (favorites && favorites.length) {
      const favBag = favorites.findIndex((v: IBasketOrder) => {
        return v.id === product.id &&
          v.images.color.colorHex === product.images.color.colorHex &&
          v.size === (this.orderSize || this.product.size[0]);
      });
      if (favBag !== -1) {
        favorites = favorites.filter((v, i) => i !== favBag);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      } else {
        localStorage.setItem('favorites', JSON.stringify([product, ...favorites]));
      }
    } else {
      localStorage.setItem('favorites', JSON.stringify([product]));
    }
    let favoritesIds = JSON.parse(localStorage.getItem('favoritesIds'));
    const favoritesId = this.product.id +
      ((this.productImages && this.productImages.color.colorHex) || this.product.images[0].color.colorHex) +
      (this.orderSize || this.product.size[0]);
    if (favoritesIds && favoritesIds.length) {
      const favIndex = favoritesIds.findIndex((v: string) => v === favoritesId);
      if (favIndex !== -1) {
        favoritesIds = favoritesIds.filter((v, i) => i !== favIndex);
        localStorage.setItem('favoritesIds', JSON.stringify(favoritesIds));
      } else {
        localStorage.setItem('favoritesIds', JSON.stringify([favoritesId, ...favoritesIds]));
      }
    } else {
      localStorage.setItem('favoritesIds', JSON.stringify([favoritesId]));
    }

    this.favoritesIds = JSON.parse(localStorage.getItem('favoritesIds'));
  }

  isRedHeart(prod: IProduct): boolean {
    this.favoritesIds = JSON.parse(localStorage.getItem('favoritesIds'));

    if (prod && this.favoritesIds) {
      const id = prod.id +
        ((this.productImages && this.productImages.color.colorHex) || prod.images[0].color.colorHex) +
        (this.orderSize || prod.size[0]);
      return this.favoritesIds.includes(id);
    } else {
      return false;
    }
  }

  addToBasket(): void {
    const product = new BasketOrder(
      this.product.category,
      this.product.name,
      this.productImages || this.product.images[0],
      this.orderSize || this.product.size[0],
      this.product.description,
      this.product.fabricComposition,
      this.product.price,
      this.product.isSale,
      this.product.sale,
      1,
      this.product.isSale ? +this.product.sale.priceWithDiscount : this.product.price,
      this.product.id
    );
    let orders = JSON.parse(localStorage.getItem('orders'));
    if (orders && orders.length) {
      const orderInBag = orders.findIndex((v: IBasketOrder) => {
        return v.name === product.name &&
          v.images.color.colorHex === product.images.color.colorHex &&
          v.size === (this.orderSize || this.product.size[0]);
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

  public getCellCount(): number {
    return this.innerWidth <= 1200 && this.innerWidth > 1025 ? 3
      : this.innerWidth <= 1024 && this.innerWidth >= 500 ? 2
        : this.innerWidth < 500 ? 1 : 4;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.innerWidth = window.innerWidth;
  }

}


export const deliveryAndPayment: IPanel = {
  pTitle: 'Delivery and Payment',
  pText: `SHIPPING: Shipping is available to customers at least 13 years of age with a valid US shipping and billing address. RETURNS: Easy online returns within 30 days (return fee $5.99). Free return or exchange in-store with the exception of H&M HOME items purchased online.These items must be returned by mail only. PAYMENT: We accept card payments via Visa, MasterCard, Discover and American Express. You can also pay with Pay later, PayPal and H&M Gift Cards. Learn more on our customer service pages.`
};
