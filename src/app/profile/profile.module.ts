import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { MyInformationComponent } from './my-information/my-information.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
const routes: Routes = [
  {
    path: '', component: ProfileComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'my-information' },
      { path: 'my-information', component: MyInformationComponent},
      { path: 'my-orders', component: MyOrdersComponent},
    ]
  }
];
@NgModule({
  declarations: [
    ProfileComponent,
    MyInformationComponent,
    MyOrdersComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
  providers: [],
})
export class ProfileModule { }
