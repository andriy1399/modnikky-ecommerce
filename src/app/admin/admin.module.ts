import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminCatalogComponent } from './admin-catalog/admin-catalog.component';
import { SharedModule } from '../shared/shared.module';
import { AdminFiltersComponent } from './admin-filters/admin-filters.component';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'category' },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'catalog', component: AdminCatalogComponent },
      { path: 'filters', component: AdminFiltersComponent }
    ]
  }
];
@NgModule({
  declarations: [
    AdminComponent,
    AdminCategoryComponent,
    AdminCatalogComponent,
    AdminFiltersComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatFormFieldModule,
    MatChipsModule,
    MatTableModule,
    MatCheckboxModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [RouterModule]
})
export class AdminModule { }
