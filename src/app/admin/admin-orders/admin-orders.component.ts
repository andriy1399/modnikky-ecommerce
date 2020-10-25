import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IOrder } from '../../shared/interfaces/order.interface';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminOrdersComponent implements OnInit {
  columnsToDisplay = ['firstName', 'lastName', 'phone', 'comment', 'date', 'totalPrice', 'delete'];
  orders: MatTableDataSource<IOrder>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  expandedElement: IOrder | null;
  constructor(
    private orderServ: OrderService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orders.filter = filterValue.trim().toLowerCase();

    if (this.orders.paginator) {
      this.orders.paginator.firstPage();
    }
  }

  private getOrders(): void {
    this.orderServ.getOrders()
      .subscribe(data => {
        this.orders = new MatTableDataSource(data.map(e => {
          const orderId = e.payload.doc.id;
          const otherData = e.payload.doc.data() as IOrder;
          return { orderId, ...otherData };
        }));
        console.log(this.orders);
        this.orders.paginator = this.paginator;
      });
  }

}
