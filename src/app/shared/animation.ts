import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';


export const fadeIn = trigger('fadeIn', [
  transition(':enter', animate('5s', keyframes([
    style({ opacity: 0 }),
    style({ opacity: 1 }),
  ])))
]);
