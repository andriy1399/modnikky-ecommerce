import { Component, OnInit } from '@angular/core';
import { SignInModalService } from '../../shared/services/sign-in-modal.service';
import { AuthService } from '../../shared/services/auth.service';

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
  constructor(
    public signInModal: SignInModalService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.parseData();
    this.checkLogin();
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
}
