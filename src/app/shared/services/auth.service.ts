import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUser } from '../interfaces/user.interface';
import { ISignUp } from '../interfaces/sign-up.interface';
import { Router } from '@angular/router';
import { SignInModalService } from './sign-in-modal.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  errorText = new Subject<string>();
  btnDisabled = new Subject<boolean>();
  menuItemFor = new Subject<string>();
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private singInModal: SignInModalService
  ) { }

  signIn(email: string, password: string): void {
    this.errorText.next('');
    this.btnDisabled.next(true);
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        this.firestore.collection('users').ref.where('id', '==', userCredential.user.uid)
          .onSnapshot(document => {
            document.forEach(user => {
              const data = user.data();
              delete data.historyOfOrders;
              localStorage.setItem('userCredential', JSON.stringify(data));
              if (data.role === 'admin' && data.success) {
                this.router.navigateByUrl('admin');
                this.menuItemFor.next('admin');
              } else if (data.role === 'user') {
                this.router.navigateByUrl('profile');
                this.menuItemFor.next('user');
              }
              this.singInModal.isSignInClicked = false;
            });
          });
      }).catch(err => this.errorText.next(err.message))
      .finally(() => this.btnDisabled.next(false));
  }

  signUp(userData: ISignUp): void {
    const { email, password } = userData;
    this.errorText.next('');
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user: IUser = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userCredential.user.email,
          role: 'user',
          success: false,
          id: userCredential.user.uid
        };
        this.btnDisabled.next(true);
        this.firestore.collection('users').add(user)
          .then(() => {
            localStorage.setItem('userCredential', JSON.stringify(user));
            this.router.navigateByUrl('profile');
            this.singInModal.isSignInClicked = false;
            this.menuItemFor.next('user');
          })
          .catch(err => console.log(err, 'err'))
          .finally(() => this.btnDisabled.next(false));
      }).catch(err => this.errorText.next(err.message));
  }

  singOut(): void {
    this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('userCredential');
        this.router.navigateByUrl('home');
        this.menuItemFor.next('sign in');
      });
  }
}

