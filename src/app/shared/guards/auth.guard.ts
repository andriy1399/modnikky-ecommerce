import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }
  checkLogin(): boolean {
    if (localStorage.getItem('userCredential')) {
      const admin: IUser = JSON.parse(localStorage.getItem('userCredential'));
      if (admin && admin.role === 'admin' && admin.success) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
