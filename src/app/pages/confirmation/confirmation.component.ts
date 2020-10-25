import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
  }



  ngOnDestroy(): void {
    localStorage.removeItem('orders');
    localStorage.removeItem('confirmation');
  }

}
