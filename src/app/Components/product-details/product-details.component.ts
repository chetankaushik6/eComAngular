import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ProductData } from '../../data-type';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: ProductData | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const productId = params['productId'];
      if (productId) {
        this.productService.getProduct(productId).subscribe((result) => {
          this.product = result;
          console.warn("product details ------>",this.product);
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
}
