import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminCatalogComponent } from './admin-catalog/admin-catalog.component';
import { SharedModule } from '../shared/shared.module';
import { AdminFiltersComponent } from './admin-filters/admin-filters.component';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'category' },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'catalog', component: AdminCatalogComponent },
      { path: 'filters', component: AdminFiltersComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'news', component: AdminNewsComponent }
    ]
  }
];
@NgModule({
  declarations: [
    AdminComponent,
    AdminCategoryComponent,
    AdminCatalogComponent,
    AdminFiltersComponent,
    AdminOrdersComponent,
    AdminNewsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatChipsModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
  ],
  exports: [RouterModule]
})
export class AdminModule { }
