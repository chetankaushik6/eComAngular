import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ProductData } from '../../data-type';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-seller-add-product',
  imports: [FormsModule,CommonModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  AddProductMsg:string|undefined;
  constructor(private products: ProductsService){}
       ngOnInit():void{}
         submit(data: ProductData) {
    console.log("product added ", data);
    this.products.addProducts(data).subscribe((result)=>{
            //  console.log("api products", result);
            //  alert("product added successfully");
             if(result){
                 this.AddProductMsg = "product added successfully";
             }
             setTimeout(()=>(this.AddProductMsg=undefined),3000);
    })
  }
}
