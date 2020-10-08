import { Component } from '@angular/core';
import { signInEclipseAnime } from './shared/animations/sign-in.animation';
import { SignInModalService } from './shared/services/sign-in-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [signInEclipseAnime]
})
export class AppComponent {
  constructor(
    public signInModal: SignInModalService
  ) {
  }
}
