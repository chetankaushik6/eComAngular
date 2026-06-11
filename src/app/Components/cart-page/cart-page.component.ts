import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { cartData } from '../../data-type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart-page',
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: cartData[] = [];


  constructor(private productsService: ProductsService, private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;

    if (userId) {
      this.productsService.cartData.subscribe((cartItems) => {
        this.cartData = cartItems as cartData[] || [];
      });
      this.productsService.getCartList(userId);
      return;
    }

    const localCart = localStorage.getItem('localCart');
    this.cartData = localCart ? (JSON.parse(localCart) as cartData[]) : [];
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
    if (!id) {
      return;
    }

    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;

    if (userId) {
      this.productsService.removeFromCart(id).subscribe(() => {
        this.productsService.getCartList(userId);
      });
      return;
    }

    this.productsService.localRemoveFromCart(String(id));
    this.cartData = this.cartData.filter((item) => String(item.id) !== String(id));
  }

  checkout(){
      this.router.navigate(['/checkout']);
  }
}