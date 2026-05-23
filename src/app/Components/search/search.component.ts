import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ProductData } from '../../data-type';
@Component({
  selector: 'app-search',
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  searchQuery: string = '';
  products: ProductData[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let query = params['query'];
      if (query) {
        this.searchQuery = query;
        this.productService.searchProducts(query).subscribe((result) => {
          console.log("search result", result);
          this.products = result;
        });
      } else {
        this.products = [];
        this.searchQuery = '';
      }
    });
  }

}
