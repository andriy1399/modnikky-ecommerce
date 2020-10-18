import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct, IImage } from '../../shared/interfaces/product.interface';
import { IPanel } from '../../shared/interfaces/panel.interface';
import { IBreadcrumb } from '../../shared/interfaces/breadcrumb.interface';
import { SwiperOptions } from 'swiper';
import { BasketOrder } from '../../shared/models/basket-order.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
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
  constructor(
    private productsServ: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.getProduct();
  }

  changeProductModel(color: IImage): void {
    this.showImgArr = color.images;
    this.productImages = color;
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
        products = products.filter(v => v.id !== prod.id).sort((a: any, b: any) => a.dateAdded - b.dateAdded);
        this.completeLook = [products.reverse()[0], products.reverse()[0]];
        this.moreProducts = products.filter(v => v.id !== this.completeLook[0].id && v.id !== this.completeLook[1].id);
      });

  }

  public updateProduct(id: string, image?: IImage): void {
    this.getProduct(id);
    this.showImgArr = image.images;
  }
  private getBreadcrumb(product: IProduct): void {
    const type = JSON.parse(localStorage.getItem('type'));
    this.breadcrumb = {
      type,
      category: product.category,
      name: product.name
    };
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
    );
    const orders = JSON.parse(localStorage.getItem('orders'));
    if (orders && orders.length) {
      localStorage.setItem('orders', JSON.stringify([...orders, product]));
    } else {
      localStorage.setItem('orders', JSON.stringify([product]));
    }
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
