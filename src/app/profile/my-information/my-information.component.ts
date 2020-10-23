import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-information',
  templateUrl: './my-information.component.html',
  styleUrls: ['./my-information.component.scss']
})
export class MyInformationComponent implements OnInit {
  firstName = '';
  lastName = '';
  telephone1 = '';
  telephone2 = '';
  dateOfBirthday: Date;
  city = '';
  street = '';
  build = '';
  flour: number;
  apartment: number;
  aboutMyself = '';
  constructor() { }

  ngOnInit(): void {
  }

}
