import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private authServ: AuthService
  ) { }

  ngOnInit(): void {
  }

  signOut(): void {
    this.authServ.singOut();
  }

}
