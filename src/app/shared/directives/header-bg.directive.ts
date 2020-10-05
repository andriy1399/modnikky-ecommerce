import { AfterViewChecked, Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appHeaderBg]'
})
export class HeaderBgDirective implements OnInit, AfterViewChecked {

  isMore = false;
  constructor(
    private el: ElementRef,
    private r: Renderer2,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }
  @HostListener('window:scroll', ['$event.target']) onScroll(event): void {
  }

  ngAfterViewChecked(): void {
    if (window.scrollY > 54 && !this.isMore) {
      this.r.removeClass(this.el.nativeElement, 'dark-mode');
      this.isMore = true;
    } else if (this.router.url !== '/home') {
      this.r.removeClass(this.el.nativeElement, 'dark-mode');
    } else if (window.scrollY < 54) {
      this.r.addClass(this.el.nativeElement, 'dark-mode');
      this.isMore = false;
    }
  }

}
