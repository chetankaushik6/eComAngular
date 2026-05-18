import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductData } from '../../data-type';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee,faDeleteLeft,faTrash, faPenSquare,faEdit,faUsersViewfinder } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-seller-home',
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  productList:undefined| ProductData[];
  deleteMessage:undefined|string;
  faCoffee = faCoffee;
  faDeleteLeft = faDeleteLeft;
  faTrash = faTrash;
  faPenSquare = faPenSquare;
  faEdit = faEdit;
  faUsersViewfinder = faUsersViewfinder;
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
