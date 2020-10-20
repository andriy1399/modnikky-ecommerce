import { trigger, transition, query, animate, style } from '@angular/animations';
export const bagModalAnimation = trigger('bagModal', [
  transition('void => *', [
    query('.bag-modal', [
      style({marginRight: '-500px'}),
      animate('400ms ease-in', style({
        marginRight: '0'
      })),
    ])
  ]),
  transition('* => void', [
    query('.bag-modal', [
      style({marginRight: '0px'}),
      animate('400ms ease-out', style({
        marginRight: '-500px'
      })),
    ])
  ])
]);
