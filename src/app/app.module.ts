import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { BagModalComponent } from './components/bag-modal/bag-modal.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductComponent } from './pages/product/product.component';
import { BagComponent } from './pages/bag/bag.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';


import { SharedModule } from './shared/shared.module';
import { HeaderBgDirective } from './shared/directives/header-bg.directive';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { PanelComponent } from './components/panel/panel.component';
import { HideModalDirective } from './shared/directives/hide-modal.directive';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment.prod';
import { ProductListComponent } from './pages/shop/product-list/product-list.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { ImgHoverDirective } from './shared/directives/img-hover.directive';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { NgxPaginationModule } from 'ngx-pagination';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';

import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from './preloader-config';
import { CustomerServiceComponent } from './pages/customer-service/customer-service.component';
import { NewsComponent } from './pages/news/news.component';
import { NewsDetailsComponent } from './pages/news-details/news-details.component';
import { SearchComponent } from './pages/search/search.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignInComponent,
    BagModalComponent,
    HomeComponent,
    ShopComponent,
    ProductComponent,
    BagComponent,
    FavoritesComponent,
    HeaderBgDirective,
    PanelComponent,
    HideModalDirective,
    ProductListComponent,
    ImgHoverDirective,
    ConfirmationComponent,
    CustomerServiceComponent,
    NewsComponent,
    NewsDetailsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MatMenuModule,
    IvyCarouselModule,
    MatExpansionModule,
    NgxUsefulSwiperModule,
    NgxPaginationModule,
    LazyLoadImageModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
