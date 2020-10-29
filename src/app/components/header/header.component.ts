import { Component, OnInit } from '@angular/core';
import { SignInModalService } from '../../shared/services/sign-in-modal.service';
import { AuthService } from '../../shared/services/auth.service';
import { ProductService } from '../../shared/services/product.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSearchClicked = false;
  urlAddress: string;
  urlName: string;
  loginStatus: boolean;
  countOfOrders = 0;
  constructor(
    public signInModal: SignInModalService,
    private auth: AuthService,
    private productServ: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.parseData();
    this.checkLogin();
    this.getBagCount();
    this.productServ.bag.subscribe(c => this.countOfOrders = c);
    this.productServ.search.subscribe(_ => this.router.navigateByUrl('search'));
  }

  checkLogin(): void {
    this.auth.menuItemFor.subscribe(() => this.parseData());
  }

  private parseData(): void {
    const data = JSON.parse(localStorage.getItem('userCredential'));
    if (data) {
      if (data.role === 'admin') {
        this.urlAddress = 'admin';
        this.urlName = 'admin';
      } else if (data.role === 'user') {
        this.urlAddress = 'profile';
        this.urlName = data.firstName;
      }
      this.loginStatus = true;
    } else {
      this.urlAddress = '';
      this.urlName = '';
      this.loginStatus = false;
    }
  }

  searchItems(event: Event): void {
    const word = (event.target as HTMLInputElement).value;
    if (word) {
      this.productServ.search.next(word);
      localStorage.setItem('searchName', JSON.stringify(word));
    }

  }

  private getBagCount(): void {
    const orders = JSON.parse(localStorage.getItem('orders'));
    if (orders && orders.length) {
      this.countOfOrders = orders.reduce((acc, v) => acc + v.count, 0);
    }
  }
}
