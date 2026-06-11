import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { ProductData, cartData } from '../../data-type';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | ProductData[];
   cartItems =0;
  constructor(private router: Router, private product: ProductsService) { }

  ngOnInit(): void {
    this.checkMenuType();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkMenuType();
    });

    const user = localStorage.getItem('user');
    if (!user) {
      const cartData = localStorage.getItem('localCart');
      if (cartData) {
        const parsed = JSON.parse(cartData) as (ProductData | cartData)[];
        this.cartItems = parsed.reduce((count, item) => count + ((item as any).quantity || 1), 0);
      }
    }

    this.product.cartData.subscribe((items) => {
      this.cartItems = items.reduce((count, item) => count + ((item as any).quantity || 1), 0);
    });
  }

  checkMenuType(): void {
    const sellerStore = localStorage.getItem('seller');
    const userStore = localStorage.getItem('user');
    const currentUrl = this.router.url;

    if (sellerStore && currentUrl.includes('seller')) {
      console.warn('inside seller area');
      const sellerData = JSON.parse(sellerStore);
      this.sellerName = Array.isArray(sellerData) ? sellerData[0]?.name : sellerData?.name;
      this.menuType = 'seller';
      return;
    }

    if (userStore) {
      console.warn('user logged in');
      const userData = JSON.parse(userStore);
      const profile = Array.isArray(userData) ? userData[0] : userData;
      this.userName = profile?.name || profile?.username || '';
      this.menuType = 'user';
      this.product.getCartList(userData.id);
      return;
    }

    console.warn('default menu');
    this.menuType = 'default';
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = (query.target as HTMLInputElement).value;
      if (!element) {
        this.searchResult = [];
        return;
      }
      console.log(element);
      this.product.searchProducts(element).subscribe((result) => {
        console.warn("search result", result);
        if(result.length >5){
            result.length =5;
        }
        this.searchResult = result;
      })
    }

  }

  logout() {
    localStorage.removeItem('seller');
    this.userName = '';
    this.menuType = 'default';
    this.checkMenuType();
    this.router.navigate(['/']);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.userName = '';
    this.menuType = 'default';
    this.checkMenuType();
    this.router.navigate(['/userAuth']);
    this.product.cartData.emit([]);
  }

  submitSearch(value:string){
      // console.warn("submit search",value);
      //  this.searchResult = [];
      this.router.navigate(['/search', value]);
  }
}
