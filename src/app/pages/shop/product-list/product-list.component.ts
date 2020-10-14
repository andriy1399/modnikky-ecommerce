import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  rSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.rSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(this.route.snapshot.url.join(''));
      }
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

}
