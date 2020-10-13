import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ShopComponent } from './pages/shop/shop.component';
import { HomeComponent } from './pages/home/home.component';
import { SaleComponent } from './pages/sale/sale.component';
import { ProductComponent } from './pages/product/product.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { BagComponent } from './pages/bag/bag.component';
import { NewArrivalsComponent } from './pages/new-arrivals/new-arrivals.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ProfileGuard } from './shared/guards/profile.guard';
import { ProductListComponent } from './pages/shop/product-list/product-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'catalog/:type', component: ShopComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'view-all' },
      { path: 'view-all', component: ProductListComponent },
      { path: ':category', component: ProductListComponent }
    ]
  },

  { path: 'favorites', component: FavoritesComponent },
  { path: 'bag', component: BagComponent },
  { path: 'product/:category/:id', component: ProductComponent },
  {
    path: 'profile',
    canActivate: [ProfileGuard],
    component: ProfileComponent
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'top',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
