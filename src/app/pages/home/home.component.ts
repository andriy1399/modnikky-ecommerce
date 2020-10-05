import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images: Array<string> = [
    'https://images.pexels.com/photos/1113554/pexels-photo-1113554.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/1661469/pexels-photo-1661469.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/4380970/pexels-photo-4380970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/859195/pexels-photo-859195.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  ];

  public innerWidth: number;
  constructor() { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }
  public getCellCount(): number {
    return this.innerWidth <= 1200 && this.innerWidth > 1025 ? 3
      : this.innerWidth <=  1024 && this.innerWidth >= 500 ? 2
        : this.innerWidth < 500 ? 1 : 4;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.innerWidth = window.innerWidth;
  }

}
