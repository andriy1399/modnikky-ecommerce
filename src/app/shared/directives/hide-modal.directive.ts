import { Directive, HostListener } from '@angular/core';
import { SignInModalService } from '../services/sign-in-modal.service';

@Directive({
  selector: '[appHideModal]'
})
export class HideModalDirective {

  constructor(
    private signInModal: SignInModalService
  ) { }
  @HostListener('click', ['$event.target'])
  onHide(e): void {
    if (e.className.split(' ')[0] === 'sign-in') {
      this.signInModal.isSignInClicked = false;
    }
  }
}
