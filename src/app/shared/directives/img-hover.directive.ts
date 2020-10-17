import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appImgHover]',
})
export class ImgHoverDirective {

  @Input() imgH: string;
  currentImg: string;
  overImgClearTm: number;
  constructor(
    private el: ElementRef,
    private r: Renderer2,
  ) {
  }

  @HostListener('mouseenter', ['$event.target']) onOverImg(e): void {
    this.currentImg = this.el.nativeElement.src;
    this.r.setAttribute(e, 'src', this.imgH);

  }
  @HostListener('mouseleave', ['$event.target']) onOutImg(e): void {
    this.r.setAttribute(e, 'src', this.currentImg);
  }
}
