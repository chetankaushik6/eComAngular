import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { cartData, ProductData } from '../data-type';
import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
   cartData =new EventEmitter<ProductData[] | []>();
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
  popularProducts(){
      return this.http.get<ProductData[]>('http://localhost:3000/products')
        .pipe(map(products => products.slice(0, 3)));
  }

  trendyProducts(){
     return this.http.get<ProductData[]>('http://localhost:3000/products')
        .pipe(map(products => products.slice(0, 10)));
  }

//   searchProducts(query: string = '') {
//   return this.http
//     .get<ProductData[]>('http://localhost:3000/products')
//     .pipe(
//       map((products) => {
        
//         // top 10 trending products
//         let trendy = products.slice(0, 10);

//         // agar search keyword hai to filter karo
//         if (query.trim()) {
//           trendy = trendy.filter((item) =>
//             item.name.toLowerCase().includes(query.toLowerCase())
//           );
//         }

//         return trendy;
//       })
//     );
// }
searchProducts(query: string = '') {
  return this.http
    .get<ProductData[]>('http://localhost:3000/products')
    .pipe(
      map((products) => {
        if (!query.trim()) {
          return products.slice(0, 10);
        }

        const searchText = query.toLowerCase();

        return products.filter((item) =>

          item.name?.toLowerCase().includes(searchText) ||

          item.color?.toLowerCase().includes(searchText) ||

          item.category?.toLowerCase().includes(searchText) ||

          item.description?.toLowerCase().includes(searchText) ||

          item.price?.toString().includes(searchText)
        );
      })
    );
}
//   searchProducts(query: string) {
//   return this.http.get<ProductData[]>(
//     `http://localhost:3000/products?q=${query}`
//   );
// }

localAddToCart(product: ProductData) {
  let cart: ProductData[] = [];
  const localCart = localStorage.getItem('localCart');
  if (localCart) {
    cart = JSON.parse(localCart) as ProductData[];
  }
  cart.push(product);
  localStorage.setItem('localCart', JSON.stringify(cart));

  this.cartData.emit(cart);
}

localRemoveFromCart(productId: string) {
  const localCart = localStorage.getItem('localCart');
  if (localCart) {
    let cart: ProductData[] = JSON.parse(localCart) as ProductData[];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('localCart', JSON.stringify(cart));
    this.cartData.emit(cart);
      
  }
}
addToCart(cartDataResult: cartData) {
     return  this.http.post('http://localhost:3000/cart', cartDataResult);
 }

 getCartList(userId: string) {
     return this.http.get<ProductData[]>(`http://localhost:3000/cart?userId=${userId}`,{observe:'response'}).subscribe((res)=>{
         if(res && res.body){
              this.cartData.emit(res.body);
         }
     })
    
 }

 removeFromCart(cartId: any) {
      return this.http.delete(`http://localhost:3000/cart/${cartId}`);
 }
}