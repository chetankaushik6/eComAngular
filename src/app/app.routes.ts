import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { SellerComponent } from './Components/seller/seller.component';
import { LoginComponent } from './Components/login/login.component';
import { CartComponent } from './Components/cart/cart.component';
import { SellerHomeComponent } from './Components/seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './Components/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './Components/seller-update-product/seller-update-product.component';
import { SearchComponent } from './Components/search/search.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { UserAuthComponent } from './Components/user-auth/user-auth.component';
import { CartPageComponent } from './Components/cart-page/cart-page.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'seller', component: SellerComponent },
    { path: 'sellerHome', component: SellerHomeComponent, canActivate: [authGuard] },
    { path: 'seller-add-product', component: SellerAddProductComponent, canActivate: [authGuard] },
       { path: 'seller-update-product/:id', component: SellerUpdateProductComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'cart', component: CartComponent },
    { path: 'search/:query', component: SearchComponent },
     { path: 'detail/:productId', component: ProductDetailsComponent },
       { path: 'userAuth', component: UserAuthComponent },
          { path: 'cart-page', component: CartPageComponent },
           { path: 'checkout', component: CheckoutComponent },
];
