import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ShopComponent } from './pages/shop/shop.component';
import { HomeComponent } from './pages/home/home.component';
import { SaleComponent } from './pages/sale/sale.component';
import { ProductComponent } from './pages/product/product.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { BagComponent } from './pages/bag/bag.component';
import { NewArrivalsComponent } from './pages/new-arrivals/new-arrivals.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'sale', component: SaleComponent },
  { path: 'new-arrivals', component: NewArrivalsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'bag', component: BagComponent },
  { path: 'product/:category/:id', component: ProductComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'top',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
