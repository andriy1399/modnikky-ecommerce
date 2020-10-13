import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { BagModalComponent } from './components/bag-modal/bag-modal.component';
import { NewArrivalsComponent } from './pages/new-arrivals/new-arrivals.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { SaleComponent } from './pages/sale/sale.component';
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
import { environment } from '../environments/environment';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignInComponent,
    BagModalComponent,
    NewArrivalsComponent,
    HomeComponent,
    ShopComponent,
    SaleComponent,
    ProductComponent,
    BagComponent,
    FavoritesComponent,
    HeaderBgDirective,
    PanelComponent,
    HideModalDirective,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MatMenuModule,
    IvyCarouselModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
