import { Component, OnInit } from '@angular/core';
import { IPanel } from '../../shared/interfaces/panel.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footerInfo: Array<IPanel> = [
    {
      pTitle: 'CUSTOMER SERVICE', pList: [
        { text: 'quality', href: 'customer-service' },
        { text: 'DELIVERY ', href: 'customer-service' },
        { text: 'PAYMENT', href: 'customer-service' },
        { text: 'RETURNS', href: 'customer-service' },
        { text: 'MAKE A RETURN', href: 'customer-service' },
      ]
    },
    {
      pTitle: 'info', pList: [
        { text: 'news', href: 'news' },
        { text: 'size guide' },
        { text: 'careers at modnikky' },
        { text: 'about us' },
        { text: 'legal policies' },
      ]
    },
    {
      pTitle: 'follow us', pList: [
        {
          text: 'facebook',
          img: 'https://svgsilh.com/svg/667456.svg',
          href: 'https://uk-ua.facebook.com/'
        },
        {
          text: 'linkedin',
          img: 'https://www.flaticon.com/svg/static/icons/svg/38/38669.svg',
          href: 'https://www.linkedin.com/'
        },
        {
          text: 'instagram',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Instagram_font_awesome.svg/1024px-Instagram_font_awesome.svg.png',
          href: 'https://www.instagram.com'
        },
      ]
    },
    {
      pTitle: 'Contacts', pList: [
        { text: 'hello@modnikky.com' },
        { text: '+380505012333' },
        { text: 'Shevchencka 23, Lviv' },
      ]
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
