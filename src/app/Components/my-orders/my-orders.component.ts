import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { orderData } from '../../data-type';

@Component({
  selector: 'app-my-orders',
  imports: [FormsModule,CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  orderData: orderData[] | undefined;
  selectedOrder: orderData | undefined;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.orderList().subscribe((orders) => {
      console.warn("check order data===", orders);
      this.orderData = orders;
    });
  }

  openOrderModal(orderId: string | number | undefined) {
    if (!orderId || !this.orderData) {
      return;
    }
    this.selectedOrder = this.orderData.find((order) => String(order.id) === String(orderId));
  }

  closeOrderModal() {
    this.selectedOrder = undefined;
  }

  getOrderTotal(order: orderData | undefined): number {
    if (!order || !order.items) {
      return 0;
    }
    return order.items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  }

  removeOrder(orderId: number | string | undefined) {
    if (!orderId) {
      return;
    }

    this.productsService.deleteOrder(orderId).subscribe(() => {
      if (this.orderData) {
        this.orderData = this.orderData.filter(order => String(order.id) !== String(orderId));
      }
    });
  }
}
