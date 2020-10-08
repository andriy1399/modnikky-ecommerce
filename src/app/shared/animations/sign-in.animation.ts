import { trigger, transition, useAnimation, style, query, animate } from '@angular/animations';
import { rollIn, rollOut, zoomIn, zoomOut } from 'ng-animate';

export const signInModalAnime = trigger('ModalAnime', [
  transition('void => *', [
    style({ opacity: 0 }),
    useAnimation(zoomIn, {
      params: { timing: 0.3, delay: 0.2 }
    }),
    style({ opacity: 1 })
  ]),
]);

export const signInEclipseAnime = trigger('EclipseAnime', [
  transition('* => void', [
    query('.sign-in__modal',
      useAnimation(zoomOut, {
        params: { timing: 0.3, delay: 0 }
      })
    ),
    animate('0s 0.3s')
  ]),
]);
