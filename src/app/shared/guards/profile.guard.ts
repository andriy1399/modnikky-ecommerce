import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }
  checkLogin(): boolean {
    if (JSON.parse(localStorage.getItem('userCredential'))) {
      const user = JSON.parse(localStorage.getItem('userCredential'));
      if (user && user.role === 'user') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
