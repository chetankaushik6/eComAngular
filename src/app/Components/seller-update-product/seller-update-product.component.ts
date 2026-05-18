import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ProductData } from '../../data-type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
  productData: undefined | ProductData;
  productMsg: undefined | string;
  constructor(private Route: ActivatedRoute, private productService: ProductsService,private router: Router) { }
  ngOnInit() {
    let productId = this.Route.snapshot.paramMap.get('id');
    console.log("product id for updte", productId);

    productId && this.productService.getProduct(productId).subscribe((result) => {
      console.log("product details for update", result);
      this.productData = result;
    })
  }

  submit(data: ProductData) {
    // console.log("updated ........", data);
       if(this.productData){
         data.id =  this.productData.id;
         console.log("check data id >>>>>",data.id);
      }

    this.productService.updateProduct(data).subscribe((result) => {
   
      if (result) {
        this.productMsg = "Product updated successfully";
        alert(this.productMsg);
      }

      setTimeout(() => {
        this.productMsg = undefined;
        // this.router.navigate(['/seller-home']);
      }, 3000);
    })
  }
}
