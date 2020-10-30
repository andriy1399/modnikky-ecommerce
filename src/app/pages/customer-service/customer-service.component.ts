import { Component, HostListener, OnInit } from '@angular/core';
import { IPanel } from 'src/app/shared/interfaces/panel.interface';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.scss']
})
export class CustomerServiceComponent implements OnInit {
  quality: Array<IPanel> = [
    {
      pTitle: 'Are beauty products tested on animals?',
      pText: `We do not accept animal testing on any Modnikky Group cosmetic products, either during production or on finished products.
      Our Animal Welfare Policy also includes a zero-tolerance on animal testing of cosmetic products and we support the work that is being done to end animal testing for cosmetic purposes globally.`
    },
    {
      pTitle: 'Will my Modnikky garments shrink?',
      pText: `Modnikky accept a shrinkage of up to 3% for woven garments and 5% for knits/ jerseys. To avoid shrinkage, certain items might need ironing after washes, to regain their original shape and fit. If needed, this will always be mentioned on the care label.`
    },
    {
      pTitle: 'Are hazardous or allergenic substances being used in your production methods?',
      pText: `Modnikky bans the use of hazardous and environmentally damaging substances thoughout all production processes. All Modnikky suppliers commit to comply with our requirements and are educated in how to run production to our standards. Regular controls and inspections are also conducted to ensure your safety.`
    },
    {
      pTitle: 'How do I wash knitted wool garments?',
      pText: `Make sure you follow the care instructions on the label. If your washing machine has a wool program, use this. If hand washed, remember to carefully squeeze any extra water out of the garment. Reshape the garment after wash and dry flat for optimal care.`
    }
  ];
  delivery: Array<IPanel> = [
    {
      pTitle: 'FREE ECONOMY SHIPPING OVER $40',
      pText: `Free Economy Shipping Over $40\n
      We’ll automatically apply the free shipping at checkout. For orders below $40, the $3.99 shipping and handling cost will be applied.

      Shipping Within 12-15 Business Days\n
      Your order will be delivered within 12-15 business days following the order confirmation. Additional business days may be required for delivery during peak selling periods.\n

      Shipping Availability\n
      Delivery is available in the US only. We also ship to US Territories, Alaska, Hawaii and APO/FPO/DPO addresses, however, additional time required for delivery. Orders may be subject to delivery restrictions based on the item type, weight and size. P.O. box delivery is available.

      Certain items have transportation restrictions, and cannot be shipped to some locations. Read more here.\n

      For our Terms of Use, click here.`
    },
    {
      pTitle: 'FREE PRIORITY SHIPPING OVER $40',
      pText: `Free Priority Shipping Over $40\n\n
      We’ll automatically apply free shipping at checkout. For orders below $40, the $3.99 shipping and handling cost will be applied.\n

      Shipping Within 12-15 Business Days\n
      Your order will be delivered within 12-15 business days following the order confirmation. Additional business days may be required for delivery during peak selling periods.

      Shipping Availability\n
      Priority Shipping available for the following select states only: NY, NJ, PA, DE, DC, VA, MD, WV, NC, SC, GA, AL, TN, MS, KY, OH, IN, MI, IA, WI, MN, MO, AR, IL, RI, NH, ME, VT, CT, FL, ND, SD, NE, LA, OK, TX, CA, and KS.`
    },
  ];

  payment: Array<IPanel> = [
    {
      pTitle: 'PAYPAL',
      pText: `
      Pay in just a few steps:
      1. Select PayPal as your payment method at the checkout.
      2. You'll then be redirected to the PayPal website to proceed with the payment.
      3.  If you're already a PayPal customer, you can log in with your user details and confirm the payment. If you're new to PayPal, you can create a PayPal account and then confirm the payment.
      4. You'll then return to hm.com and your order and payment will be complete!`
    },
    {
      pTitle: 'CARD PAYMENT',
      pText: `We accept cards with MasterCard, Visa, Discover and American Express symbol.
      Keeping your online payments secure is our number one priority. That means you might need to verify your card payment with 3D Secure to complete your transaction. Contact your bank to learn more about 3D Secure authentication.`
    },
    {
      pTitle: 'GIFT CARD',
      pText: `You can use both our physical gift cards and e-gift cards in any H&M store and when shopping online.

      To make an online payment with a gift card, just follow these simple steps:
      1. Select 'Add gift card' when paying at the checkout.
      2. Enter the gift card number and PIN code in the pop-up screen.
      3. Make sure to click “add” to apply the gift card towards your purchase.`
    },
  ];
  innerWidth: number;
  constructor(
    private title: Title
  ) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.title.setTitle('Customer service | Modnikky');
  }
  public getSize(): number {
    return this.innerWidth <= 1200 && this.innerWidth > 1025 ? 16
      : this.innerWidth <= 1024 && this.innerWidth >= 500 ? 14
        : this.innerWidth < 500 ? 12 : 17;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.innerWidth = window.innerWidth;
  }
}
