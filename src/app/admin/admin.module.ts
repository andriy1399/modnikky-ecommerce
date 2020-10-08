import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminCatalogComponent } from './admin-catalog/admin-catalog.component';
import { SharedModule } from '../shared/shared.module';

import { MatCardModule } from '@angular/material/card';
const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'category' },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'catalog', component: AdminCatalogComponent },
    ]
  }
];
@NgModule({
  declarations: [
    AdminComponent,
    AdminCategoryComponent,
    AdminCatalogComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    MatCardModule
  ],
  exports: [RouterModule]
})
export class AdminModule { }
