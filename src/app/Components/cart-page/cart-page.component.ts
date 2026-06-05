import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { cartData } from '../../data-type';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: cartData[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.currentCart().subscribe((cartItems) => {
      this.cartData = cartItems || [];
      console.warn('Cart Items plz:', cartItems);
    });
  }

  get subtotal(): number {
    return this.cartData.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 0),
      0
    );
  }

  increaseQty(item: cartData) {
    if (item.quantity != null) {
      item.quantity = item.quantity + 1;
    } else {
      item.quantity = 1;
    }
  }

  decreaseQty(item: cartData) {
    if ((item.quantity || 0) > 1) {
      item.quantity = (item.quantity || 0) - 1;
    }
  }

  removeItem(id: string | number | undefined) {
    this.cartData = this.cartData.filter((item) => item.id !== id);
  }
}