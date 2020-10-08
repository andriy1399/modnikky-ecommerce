import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInModalService } from 'src/app/shared/services/sign-in-modal.service';
import { AuthService } from '../../shared/services/auth.service';
import { ISignUp } from '../../shared/interfaces/sign-up.interface';
import { Subscription } from 'rxjs';
import { signInModalAnime } from '../../shared/animations/sign-in.animation';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  animations: [signInModalAnime]
})
export class SignInComponent implements OnInit, OnDestroy {
  create: FormGroup;
  login: FormGroup;
  errorTxt: string;
  isCreateModal = false;
  isModalClicked = false;
  isBtnDisabled = false;
  bSub: Subscription;
  errSub: Subscription;
  constructor(
    public signInModal: SignInModalService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
    const passWPattern = '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,18}';
    this.create = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(passWPattern)
      ]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      checked: new FormControl(false, Validators.requiredTrue)
    });
    this.login = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(passWPattern)
      ])
    });

    this.errSub = this.authService.errorText
      .subscribe(err => this.errorTxt = err);
    this.bSub = this.authService.btnDisabled
      .subscribe(isDis => this.isBtnDisabled = isDis);
  }

  submitCreate(): void {
    this.authService.signUp(this.create.value as ISignUp);
  }

  submitLogin(): void {
    const { email, password } = this.login.value;
    this.authService.signIn(email, password);
  }

  public changeForm(): void {
    this.isCreateModal = !this.isCreateModal;
    this.errorTxt = '';
    this.login.reset();
    this.create.reset();
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 1000);
    this.login.reset();
    this.create.reset();
    if (this.bSub) {
      this.bSub.unsubscribe();
    }
    if (this.errSub) {
      this.errSub.unsubscribe();
    }
  }
}
