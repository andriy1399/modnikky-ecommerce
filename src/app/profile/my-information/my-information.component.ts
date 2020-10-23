import { Component, OnInit } from '@angular/core';
import { IMyInformation } from '../../shared/interfaces/my-information.interface';
import { ISignUp } from '../../shared/interfaces/sign-up.interface';
import { IUser } from '../../shared/interfaces/user.interface';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-my-information',
  templateUrl: './my-information.component.html',
  styleUrls: ['./my-information.component.scss']
})
export class MyInformationComponent implements OnInit {

  userCredential: IMyInformation;
  user: IMyInformation;
  constructor(
    private orderServ: OrderService
  ) { }

  ngOnInit(): void {
    this.userCredential = JSON.parse(localStorage.getItem('userCredential'));
    this.getUser();
  }

  private getUser(): void {
    this.orderServ.getUser(this.userCredential).get().subscribe(val => {
      val.forEach(v => {
        const uId = v.id;
        const data = v.data() as IMyInformation;
        this.user = { uId, ...data };
      });
    });

  }

  saveChanges(): void {
    const data: IMyInformation = {
      firstName: this.userCredential.firstName,
      lastName: this.userCredential.lastName,
      email: this.userCredential.email,
      role: this.userCredential.role,
      success: this.userCredential.success,
      id: this.userCredential.id,
      uId: this.user.uId,
      telephone1: this.userCredential.telephone1 || null,
      telephone2: this.userCredential.telephone2 || null,
      dateOfBirthday: this.userCredential.dateOfBirthday || null,
      city: this.userCredential.city || null,
      street: this.userCredential.street || null,
      build: this.userCredential.build || null,
      flour: this.userCredential.flour || null,
      apartment: this.userCredential.apartment || null,
      aboutMyself: this.userCredential.aboutMyself || null
    };
    this.orderServ.updateInformation(data)
      .then(() => localStorage.setItem('userCredential', JSON.stringify(data)));
  }

}
