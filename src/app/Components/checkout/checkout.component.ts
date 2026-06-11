import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { cartData, orderData } from '../../data-type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartData: cartData[] = [];
  shipping = 100;
  orderMsg: string = '';
  paymentMethod = 'cash';
  paymentMethods = [
    { value: 'cash', label: 'Cash on Delivery' },
    { value: 'card', label: 'Credit / Debit Card' },
    { value: 'upi', label: 'UPI' }
  ];

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.productsService.currentCart().subscribe(
      (cartItems) => {
        this.cartData = cartItems || [];
      },
      () => {
        const localCart = localStorage.getItem('localCart');
        this.cartData = localCart ? (JSON.parse(localCart) as cartData[]) : [];
      }
    );
  }

  get subtotal(): number {
    return this.cartData.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 0),
      0
    );
  }

  get totalAmount(): number {
    return this.subtotal + this.shipping;
  }

  get cartItemCount(): number {
    return this.cartData.reduce((count, item) => count + (item.quantity || 0), 0);
  }

  onSubmit(value: any) {
    let user = localStorage.getItem('user');
    let userId = user ? JSON.parse(user).id : null;
    const order: orderData = {
      userId: userId,
      ...value,
      paymentMethod: this.paymentMethod,
      subtotal: this.subtotal,
      shipping: this.shipping,
      totalAmount: this.totalAmount,
      items: this.cartData,
      id: undefined
    };

    this.cartData.forEach(item => {
      if (item.id) {
        setTimeout(() => {
          this.productsService.deleteCartItems(item.id as number);
          // this.productsService.deleteCartItems(this.cartData[0].id as number);
        }, 600);
      }
    });

    this.productsService.orderNow(order).subscribe(() => {
      alert('Order placed successfully!');
      this.cartData = [];
      this.orderMsg = 'Your order has been placed successfully!';
      setTimeout(() => {
        this.orderMsg = '';
           localStorage.removeItem('localCart');
      this.router.navigate(['/my-orders']);
      },3000);
    });

    console.log('Order submitted:', order);
    alert(`Order confirmed! Total amount: ₹${this.totalAmount}, Payment: ${this.paymentMethod}`);
  }


}
