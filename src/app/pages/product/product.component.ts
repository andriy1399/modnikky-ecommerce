import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct, IImage } from '../../shared/interfaces/product.interface';
import { IPanel } from '../../shared/interfaces/panel.interface';

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
  constructor(
    private productsServ: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  changeProductModel(color: IImage): void {
    this.showImgArr = color.images;
    console.log(color);
  }
  private getProduct(): void {
    const prodId = this.route.snapshot.paramMap.get('id');
    this.productsServ.getProductById(prodId).get()
      .then(doc => {
        if (doc.exists) {
          const id = doc.id;
          const data = doc.data() as IProduct;
          this.product = { ...data, id };
          this.panelDescription = { pTitle: 'Product description', pText: data.description } as IPanel;
          this.panelComposition = { pTitle: 'Fabric composition', pText: data.fabricComposition.fabricText } as IPanel;
          console.log(this.panelDescription);
        }
      }).catch(err => console.log(err));
  }
}


export const deliveryAndPayment: IPanel = {
  pTitle: 'Delivery and Payment',
  pText: `SHIPPING: Shipping is available to customers at least 13 years of age with a valid US shipping and billing address. RETURNS: Easy online returns within 30 days (return fee $5.99). Free return or exchange in-store with the exception of H&M HOME items purchased online.These items must be returned by mail only. PAYMENT: We accept card payments via Visa, MasterCard, Discover and American Express. You can also pay with Pay later, PayPal and H&M Gift Cards. Learn more on our customer service pages.`
};
