import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ProductData } from '../../data-type';
import {cartData} from '../../data-type';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: ProductData | undefined;
  removeCart = false;
  removecartData: cartData | ProductData | undefined;
  userId: string | number | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    this.userId = user && JSON.parse(user).id;

    this.activatedRoute.params.subscribe((params) => {
      const productId = params['productId'];
      if (productId) {
        this.productService.getProduct(productId).subscribe((result) => {
          this.product = result;
          this.updateLocalCartState();

          if (this.userId) {
            this.productService.getCartList(this.userId as string);
          }
        });
      }
    });

    this.productService.cartData.subscribe((cartItems) => {
      if (this.userId) {
        this.updateRemoteCartState(cartItems);
      }
    });
  }

  private updateLocalCartState(): void {
    if (!this.product) {
      this.removeCart = false;
      return;
    }

    const cartData = localStorage.getItem('localCart');
    if (!cartData) {
      this.removeCart = false;
      return;
    }

    const items: ProductData[] = JSON.parse(cartData);
    this.removeCart = items.some(item => String(item.id) === String(this.product?.id));
  }

  private updateRemoteCartState(cartItems: any[]): void {
    if (!this.product) {
      this.removeCart = false;
      return;
    }

    const cartItem = cartItems.find((item: any) =>
      String(item.productId) === String(this.product?.id) || String(item.id) === String(this.product?.id)
    );

    this.removecartData = cartItem;
    this.removeCart = !!cartItem;
  }
  quantity: number = 1;

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (!this.product) {
      return;
    }

    const prodWithQty = { ...this.product, quantity: this.quantity };
    const userLoggedIn = localStorage.getItem('user');

    if (!userLoggedIn) {
      this.productService.localAddToCart(prodWithQty);
      this.removeCart = true;
      console.warn('User NOT logged in - product added to localCart via service -->', prodWithQty);
      alert('Product added to cart');
      return;
    }

    if (!this.userId) {
      return;
    }

    const cartDataResult: cartData = {
      ...prodWithQty,
      userId: this.userId,
      productId: this.product.id,
      id: undefined
    };

    this.productService.addToCart(cartDataResult).subscribe((response) => {
      console.warn('Product added to cart via backend -->', response);
      alert('Product added to cart');
      this.productService.getCartList(this.userId as string);
      this.removeCart = true;
    });
  }

  removeFromCart(productId: string) {
    const idToRemove = productId;

    if (!idToRemove) {
      return;
    }

    if (!localStorage.getItem('user')) {
      this.productService.localRemoveFromCart(idToRemove);
      this.updateLocalCartState();
      this.removeCart = false;
      alert('Product removed from cart');
      return;
    }

    const cartItemId = this.removecartData?.id ?? idToRemove;
    this.productService.removeFromCart(cartItemId).subscribe(() => {
      const user = localStorage.getItem('user');
      const userId = user && JSON.parse(user).id;
      if (userId) {
        this.productService.getCartList(userId);
      }
      this.removeCart = false;
      alert('Product removed from cart');
    });
  }
}