import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductData } from '../../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-home',
  imports: [CommonModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  productList:undefined| ProductData[];
  deleteMessage:undefined|string;
  constructor(private productService:ProductsService){}
   ngOnInit(){
       this.list();
   }
   deleteProduct(id: string) {
     console.log("delete product with id:",id);
     this.productService.deleteProduct(id).subscribe((result)=>{
          if(result){
          //   alert("product deleted successfully");
            this.deleteMessage ="product deleted successfully";
            this.productList = this.productList?this.productList.filter(p => p.id !== id):[];
            this.list();
          }
          setTimeout(()=>{
                this.deleteMessage=undefined;
          },2000);
     })

}

list(){
 this.productService.ProductList().subscribe((result)=>{
             console.log("product list ready",result);
             this.productList=result;
        })  
}
}
