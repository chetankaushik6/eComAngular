import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { SellerComponent } from './Components/seller/seller.component';
import { LoginComponent } from './Components/login/login.component';
import { CartComponent } from './Components/cart/cart.component';
import { SellerHomeComponent } from './Components/seller-home/seller-home.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'seller', component: SellerComponent },
    { path: 'sellerHome', component: SellerHomeComponent , canActivate:[authGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'cart', component: CartComponent }
];
