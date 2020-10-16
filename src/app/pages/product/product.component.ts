import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct, IImage } from '../../shared/interfaces/product.interface';
import { IPanel } from '../../shared/interfaces/panel.interface';
import { IBreadcrumb } from '../../shared/interfaces/breadcrumb.interface';

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
  constructor(
    private productsServ: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  changeProductModel(color: IImage): void {
    this.showImgArr = color.images;
  }
  private getProduct(productId?: string): void {
    const prodId = this.route.snapshot.paramMap.get('id');
    this.productsServ.getProductById(productId || prodId).get()
      .then(doc => {
        if (doc.exists) {
          const id = doc.id;
          const data = doc.data() as IProduct;
          this.getBreadcrumb(data);
          this.getRandomProducts(data);
          this.product = { ...data, id };
          this.panelDescription = { pTitle: 'Product description', pText: data.description } as IPanel;
          this.panelComposition = { pTitle: 'Fabric composition', pText: data.fabricComposition.fabricText } as IPanel;
        }
      }).catch(err => console.log(err));
  }

  private getRandomProducts(prod: IProduct): void {
    this.productsServ.getProducts()
      .subscribe(data => {
        let products = data.map(e => {
          const id = e.payload.doc.id;
          const otherData = e.payload.doc.data() as IProduct;
          return { id, ...otherData };
        });
        products = products.filter(v => v.id !== prod.id).sort((a: any, b: any) => a.dateAdded - b.dateAdded);
        this.completeLook = [products.reverse()[0], products.reverse()[1]];
      });
  }

  public updateProduct(id: string): void {
    this.getProduct(id);
  }
  private getBreadcrumb(product: IProduct): void {
    const type = JSON.parse(localStorage.getItem('type'));
    this.breadcrumb = {
      type,
      category: product.category,
      name: product.name
    };
  }
}


export const deliveryAndPayment: IPanel = {
  pTitle: 'Delivery and Payment',
  pText: `SHIPPING: Shipping is available to customers at least 13 years of age with a valid US shipping and billing address. RETURNS: Easy online returns within 30 days (return fee $5.99). Free return or exchange in-store with the exception of H&M HOME items purchased online.These items must be returned by mail only. PAYMENT: We accept card payments via Visa, MasterCard, Discover and American Express. You can also pay with Pay later, PayPal and H&M Gift Cards. Learn more on our customer service pages.`
};
