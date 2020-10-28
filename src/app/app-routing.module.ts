import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ShopComponent } from './pages/shop/shop.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { BagComponent } from './pages/bag/bag.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ProfileGuard } from './shared/guards/profile.guard';
import { ProductListComponent } from './pages/shop/product-list/product-list.component';
import { ConfirmationGuard } from './shared/guards/confirmation.guard';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { CustomerServiceComponent } from './pages/customer-service/customer-service.component';
import { NewsComponent } from './pages/news/news.component';
import { NewsDetailsComponent } from './pages/news-details/news-details.component';

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
  { path: 'customer-service', component: CustomerServiceComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'bag', component: BagComponent },
  { path: 'product/:category/:id', component: ProductComponent },
  { path: 'news', component: NewsComponent },
  { path: 'news/:id', component: NewsDetailsComponent },
  {
    path: 'profile',
    canActivate: [ProfileGuard],
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: 'confirmation', canActivate: [ConfirmationGuard], component: ConfirmationComponent },
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
