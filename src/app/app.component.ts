import { Component, OnInit } from '@angular/core';
import { signInEclipseAnime } from './shared/animations/sign-in.animation';
import { SignInModalService } from './shared/services/sign-in-modal.service';
import { ProductService } from './shared/services/product.service';
import { bagModalAnimation } from './shared/animations/bag-modal.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [signInEclipseAnime, bagModalAnimation]
})
export class AppComponent implements OnInit {
  showBagModal = false;
  constructor(
    public signInModal: SignInModalService,
    private productServ: ProductService
  ) {
  }

  ngOnInit(): void {
    this.productServ.bagModalShow.subscribe(v => this.showBagModal = v);
  }
}
