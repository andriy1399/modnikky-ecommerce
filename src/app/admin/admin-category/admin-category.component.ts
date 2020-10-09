import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ICategory } from '../../shared/interfaces/category.interface';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category.model';

// export interface Fruit {
//   name: string;
// }
@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  nameCategory = '';
  showNewArrivals = false;
  showShop = true;
  showSale = false;

  isEditing = false;
  editingCategoryId: string;

  displayedColumns: string[] = ['position', 'categoryName', 'showIn', 'edit', 'delete'];
  dataCategory: MatTableDataSource<ICategory>;
  constructor(
    private categoryServ: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.getCategory();
  }

  private getCategory(): void {
    this.categoryServ.getCategory()
      .subscribe(data => {
        this.dataCategory = new MatTableDataSource(data.map(e => {
          const id = e.payload.doc.id;
          const otherData = e.payload.doc.data() as ICategory;
          return { id, ...otherData };
        }));
      });
  }

  addCategory(): void {
    if (this.nameCategory.trim()) {
      const category = new Category(this.nameCategory, this.showShop, this.showNewArrivals, this.showSale);
      delete category.id;
      this.categoryServ.addCategory(category)
        .then(() => {
          this.getCategory();
          this.clearForm();
        })
        .catch(err => console.log(err));
    }
  }

  deleteCategory(id: string): void {
    this.categoryServ.deleteCategory(id)
      .then(() => this.getCategory())
      .catch(err => console.log(err));
  }

  editCategory(cat: ICategory): void {
    this.nameCategory = cat.name;
    this.showNewArrivals = cat.showNewArrivals;
    this.showSale = cat.showSale;
    this.showShop = cat.showShop;
    this.isEditing = true;
    this.editingCategoryId = cat.id;
  }

  saveEditedCategory(): void {
    if (this.nameCategory.trim()) {
      const newCategory = new Category(
        this.nameCategory,
        this.showShop,
        this.showNewArrivals,
        this.showSale,
        this.editingCategoryId
      );
      this.categoryServ.updateCategory(newCategory)
        .then(() => {
          this.isEditing = false;
          this.clearForm();
          this.getCategory();
        }).catch(err => console.log(err));
    }
  }
  private clearForm(): void {
    this.nameCategory = '';
    this.showNewArrivals = false;
    this.showShop = true;
    this.showSale = false;
  }

}
