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
  // productData: any;
  removeCart = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const productId = params['productId'];
      if (productId) {
        this.productService.getProduct(productId).subscribe((result) => {
          this.product = result;
          // console.warn("product details ------>", this.product);
          let cartData = localStorage.getItem('localCart');
          if (cartData && this.product) {
            let items: ProductData[] = JSON.parse(cartData);
            let itemIndex = items.findIndex((item) => item.id === this.product?.id);
            if (itemIndex !== -1) {
              this.removeCart = true;
            }else{
              this.removeCart = false;
            }
          }
        });
      }
    });
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
    } else {
      console.log('User is logged in now');
      const user = localStorage.getItem('user');
      const userId = user && JSON.parse(user).id;

      const cartDataResult: cartData = {
        ...prodWithQty,
        userId,
        productId: this.product?.id
      };

      delete cartDataResult.id;


      this.productService.addToCart(cartDataResult).subscribe((response) => {
        console.warn('Product added to cart via backend -->', response);
        alert('Product added to cart');
      });
    }

  }

  removeFromCart(){
  if (this.product) {
    this.productService.localRemoveFromCart(this.product.id);
    this.removeCart = false;
    alert('Product removed from cart');
  }
}
}