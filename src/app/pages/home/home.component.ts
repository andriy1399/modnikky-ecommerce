import { Component, HostListener, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { IProduct } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newArrivals: IProduct[] = [];
  threeProducts: IProduct[] = [];
  defaultImage = 'https://media.giphy.com/media/PUYgk3wpNk0WA/giphy.gif';


  public innerWidth: number;
  constructor(
    private productServ: ProductService,
    private title: Title,
    private meta: Meta
  ) {
    title.setTitle('Modnikky | Online fashion store');
  }

  ngOnInit(): void {
    this.meta.addTags([
      { name: 'keywords', content: 'Modnikky, home, closes, shop, online shop, clothe store, modnikky' },
      { name: 'description', content: `Shop for women's fashion, beauty and home essentials online! We offer quality styles at the best price and in a sustainable way.`}
    ]);
    this.innerWidth = window.innerWidth;
    this.getProductByType();
    this.getProductsLimit();
  }

  getProductByType(): void {
    this.productServ.getProductByType('new-arrivals')
      .subscribe(data => {
        this.newArrivals = data.map(e => {
          const id = e.payload.doc.id;
          const otherData = e.payload.doc.data() as IProduct;
          return { id, ...otherData };
        });
      });
  }

  getProductsLimit(): void {
    this.productServ.getProductLimit(3)
      .subscribe(data => {
        this.threeProducts = data.map(e => {
          const id = e.payload.doc.id;
          const otherData = e.payload.doc.data() as IProduct;
          return { id, ...otherData };
        });
      });
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
