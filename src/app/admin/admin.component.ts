import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle(`ADMIN | Modnikky`);
  }

}
