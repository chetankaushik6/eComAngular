import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { ProductData } from '../../data-type';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | ProductData[];
  constructor(private router: Router, private product: ProductsService) { }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      console.log("router event", val.url);
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.warn('inside seller area', val.url);
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }

        } else {
          console.warn(' outside seller area', val.url);
          this.menuType = 'default';
        }
      }
    })


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
    alert("User logout successfully!")
    this.router.navigate(['/']);
  }

  submitSearch(value:string){
      console.warn("submit search",value);
      this.router.navigate(['/search',value]);
  }
}
