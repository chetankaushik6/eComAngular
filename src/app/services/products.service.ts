import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductData } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  addProducts(data: ProductData){
      // return this.http.post('http://localhost:3000/products', data).subscribe((result)=>{
      //      console.log("api products",result);
      //      console.log("product api called");
      // })
     return  this.http.post('http://localhost:3000/products', data);
  }

  ProductList(){
    return this.http.get<ProductData[]>('http://localhost:3000/products');
  }

  deleteProduct(id:string){
     return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id:string){
       return this.http.get<ProductData>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(product:ProductData){
      return this.http.put(`http://localhost:3000/products/${product.id}`, product);
  }
}
