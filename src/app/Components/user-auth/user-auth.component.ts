import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { LoginData, ProductData, SignupData, cartData } from '../../data-type';
import { UsersService } from '../../services/users.service';
import { ProductsService } from '../../services/products.service';
@Component({
  selector: 'app-user-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  showLogin: boolean = false;
  authError: string = '';
  constructor(private userService: UsersService, private productService: ProductsService) { }

  ngOnInit(): void {
    this.userService.userAuthReload();
  }

  onSignup(userData: SignupData) {
    // console.log(userData);
    this.userService.userSignup(userData);
  }

  onLogin(userData: LoginData) {
    // console.log("000000",userData);
    this.userService.userLogin(userData);
    this.userService.InvaliduserAuth.subscribe((isInvalid) => {
      if (isInvalid) {
        this.authError = 'Invalid login credentials';
      } else {
        this.authError = '';
        this.localCartToRemoteCart();
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }
  openSignup() {
    this.showLogin = false;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
 let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: ProductData[] = JSON.parse(data);
     

      const requests = cartDataList.map((product: ProductData) => {
        const { id, ...productWithoutId } = product as any;
        const cartItem: cartData = {
          ...productWithoutId,
          userId: userId,
          productId: product.id
        };

        return this.productService.addToCart(cartItem);
      });

      forkJoin(requests).subscribe({
        next: (responses) => {
          console.log('cart data uploaded to db', responses);
          localStorage.removeItem('localCart');
        },
        error: (error) => {
          console.error('cart upload failed', error);
        }
      });
    }
    setTimeout(()=>{
        this.productService.getCartList(userId);
    },2000);
  }


}