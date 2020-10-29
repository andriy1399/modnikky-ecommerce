import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../../shared/services/category.service';
import { ICategory } from '../../shared/interfaces/category.interface';
import { ControlContainer, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { FiltersService } from '../../shared/services/filters.service';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { IImage, IProduct, ISale } from '../../shared/interfaces/product.interface';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-admin-catalog',
  templateUrl: './admin-catalog.component.html',
  styleUrls: ['./admin-catalog.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminCatalogComponent implements OnInit {
  categories: Array<ICategory> = [];
  products: MatTableDataSource<IProduct>;
  columnsToDisplay = ['image', 'category', 'title', 'size', 'price', 'edit', 'delete'];
  expandedElement: IProduct | null;
  product: FormGroup;
  filters: Array<IFilter> = [];
  allSize: Array<string> = [];
  allFabric: string[];
  allColors: string[];
  color: string;
  uploadProgress: Observable<number>;
  previewImages: Array<string> = [];
  imgStatus = false;
  choosesImagesArr: Array<IImage> = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isEditing = false;
  editingProductId: string;
  tabsIndex = 0;
  constructor(
    private categoryServ: CategoryService,
    private filterServ: FiltersService,
    private fireStorage: AngularFireStorage,
    private productServ: ProductService
  ) { }

  ngOnInit(): void {
    this.product = new FormGroup({
      category: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      fabricComposition: new FormControl(null, Validators.required),
      size: new FormControl(null, Validators.required),
      fabric: new FormControl(null, Validators.required),
      file: new FormControl(null),
      color: new FormControl(null),
      colorHex: new FormControl('#4902ED'),
      price: new FormControl(null, Validators.required),
      isSale: new FormControl(false),
      isNewArrivals: new FormControl(false),
      discount: new FormControl({ value: null, disabled: true }),
      dateOfEdition: new FormControl({ value: null, disabled: true }),
    });

    this.getCategory();
    this.getFilters();
    this.getProducts();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();

    if (this.products.paginator) {
      this.products.paginator.firstPage();
    }
  }

  private getCategory(): void {
    this.categoryServ.getCategory()
      .subscribe(data => {
        this.categories = data.map(e => {
          const id = e.payload.doc.id;
          const otherData = e.payload.doc.data() as ICategory;
          return { id, ...otherData };
        });
      });
  }
  private getFilters(): void {
    this.filterServ.getFilters()
      .subscribe(data => {
        this.filters = data.map(e => {
          const id = e.payload.doc.id;
          const otherData = e.payload.doc.data() as IFilter;
          return { id, ...otherData };
        });
        this.allSize = this.filters.find(v => v.name === 'size').criteria;
        this.allFabric = this.filters.find(v => v.name === 'fabric').criteria;
        this.allColors = this.filters.find(v => v.name === 'color').criteria;
      }, err => console.log(err));
  }

  uploadFile(event): void {
    this.imgStatus = false;
    const file = event.target.files[0];
    const name = event.target.files[0].name;
    const task = this.fireStorage.upload(`images/${name}`, file);
    this.uploadProgress = task.percentageChanges();
    task.then(img => {
      this.fireStorage.ref(`images/${img.metadata.name}`).getDownloadURL()
        .subscribe(url => {
          this.previewImages.push(url);
          this.imgStatus = true;
        });
    });
  }
  public clearPreviewImages(): void {
    for (const url of this.previewImages) {
      this.fireStorage.storage.refFromURL(url).delete();
    }
    this.previewImages = [];
    this.product.controls.color.setValue(null);
    this.product.controls.colorHex.setValue(null);
  }

  public addPreviewImages(): void {
    const { color: colorName, colorHex } = this.product.value;
    const choosesImages: IImage = {
      images: this.previewImages,
      color: { colorHex, colorName }
    };
    this.choosesImagesArr.push(choosesImages);
    this.previewImages = [];
    this.product.controls.color.setValue(null);
    this.product.controls.colorHex.setValue(null);
  }

  public saleChange(): void {
    const { isSale } = this.product.value;
    if (isSale) {
      this.product.controls.discount.enable();
    } else {
      this.product.controls.discount.disable();
    }
  }
  public newArrivalsChange(): void {
    const { isNewArrivals } = this.product.value;
    if (isNewArrivals) {
      this.product.controls.dateOfEdition.enable();
    } else {
      this.product.controls.dateOfEdition.disable();
    }
  }

  private getProducts(): void {
    this.productServ.getProducts()
      .subscribe(data => {
        this.products = new MatTableDataSource(data.map(e => {
          const id = e.payload.doc.id;
          const otherData = e.payload.doc.data() as IProduct;
          return { id, ...otherData };
        }));
        this.products.paginator = this.paginator;
      });
  }

  addProduct(): void {
    const {
      category,
      name,
      description,
      fabricComposition,
      size,
      fabric,
      price,
      isSale,
      isNewArrivals,
      discount,
      dateOfEdition
    } = this.product.value;

    const newProduct = new Product(
      category,
      name,
      this.choosesImagesArr,
      size,
      description,
      { fabricText: fabricComposition, fabricTypes: fabric },
      price,
      isSale,
      isNewArrivals,
      new Date(),
      discount ? this.generateDiscount(price, discount) : null,
      dateOfEdition ? dateOfEdition : null,
      (name + ' ' + category + ' '
        + this.choosesImagesArr.reduce((a, c) => a.concat(c.color.colorName), []).join('')
        + ' ' + description).toLowerCase()
    );

    this.productServ.addProduct(newProduct)
      .then(() => {
        this.getProducts();
        this.product.reset();
        this.product.setValue({
          category: null,
          name: null,
          description: null,
          fabricComposition: null,
          size: null,
          fabric: null,
          price: null,
          discount: null,
          dateOfEdition: null,
          isSale: false,
          isNewArrivals: false,
          file: null,
          color: null,
          colorHex: null,
        });
        this.choosesImagesArr = [];
        this.product.controls.dateOfEdition.disable();
        this.product.controls.discount.disable();
        window.scrollTo(0, 0);
      });
  }

  saveProduct(): void {
    const {
      category,
      name,
      description,
      fabricComposition,
      size,
      fabric,
      price,
      isSale,
      isNewArrivals,
      discount,
      dateOfEdition
    } = this.product.value;

    const editedProduct = new Product(
      category,
      name,
      this.choosesImagesArr,
      size,
      description,
      { fabricText: fabricComposition, fabricTypes: fabric },
      price,
      isSale,
      isNewArrivals,
      new Date(),
      discount ? this.generateDiscount(price, discount) : null,
      dateOfEdition ? dateOfEdition : null,
      (name + ' ' + category + ' '
        + this.choosesImagesArr.reduce((a, c) => a.concat(c.color.colorName), []).join('')
        + ' ' + description).toLowerCase()
    );

    const product: IProduct = { ...editedProduct, id: this.editingProductId };
    this.productServ.updateProduct(product)
      .then(() => {
        this.getProducts();
        this.product.reset();
        this.product.setValue({
          category: null,
          name: null,
          description: null,
          fabricComposition: null,
          size: null,
          fabric: null,
          price: null,
          discount: null,
          dateOfEdition: null,
          isSale: false,
          isNewArrivals: false,
          file: null,
          color: null,
          colorHex: null,
        });
        this.choosesImagesArr = [];
        this.product.controls.dateOfEdition.disable();
        this.product.controls.discount.disable();
        this.isEditing = false;
        window.scrollTo(0, 0);
      });
  }

  editProduct(prod: IProduct): void {
    this.product.setValue({
      category: prod.category,
      name: prod.name,
      description: prod.description,
      fabricComposition: prod.fabricComposition.fabricText,
      size: prod.size,
      fabric: prod.fabricComposition.fabricTypes,
      price: prod.price,
      discount: prod.sale ? prod.sale.percents : '',
      dateOfEdition: prod.dateOfEdition,
      isSale: prod.isSale,
      isNewArrivals: prod.isNewArrivals,
      file: null,
      color: null,
      colorHex: null,
    });
    this.isEditing = true;
    this.editingProductId = prod.id;
    this.choosesImagesArr = prod.images;
    this.saleChange();
    this.newArrivalsChange();

    this.tabsIndex = 0;
  }

  deleteProduct(product: IProduct): void {
    this.productServ.deleteProduct(product.id)
      .then(() => {
        for (const images of product.images) {
          images.images.forEach(v => this.fireStorage.storage.refFromURL(v).delete());
        }
        this.getProducts();
      });
  }
  deleteImagesInForm(index: number): void {
    const images = this.choosesImagesArr.find((_, i) => i === index);
    this.choosesImagesArr = this.choosesImagesArr.filter((_, i) => i !== index);
    for (const url of images.images) {
      this.fireStorage.storage.refFromURL(url).delete();
    }
  }

  public setTabs(event): void {
    this.tabsIndex = event;
  }

  private generateDiscount(price: number, discount: string): ISale {
    if (discount[discount.length - 1] === '%') {
      const sale: ISale = {
        percents: discount,
        dollars: +(parseInt(discount, 10) / 100 * price).toFixed(2),
        priceWithDiscount: +(price - (parseInt(discount, 10) / 100 * price)).toFixed(2)
      };
      return sale;
    } else {
      const disc = parseInt(discount, 10);
      const sale: ISale = {
        percents: ((disc / price * 100) + '%'),
        dollars: +disc.toFixed(2),
        priceWithDiscount: +(price - disc).toFixed(2)
      };
      return sale;
    }
  }
}

