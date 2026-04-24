import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData, SignupData } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient , private router: Router) { }
  userSignup(data: SignupData) {
    // console.log("user signup successfully", data,);
    // alert("user signup successfully");
    this.http.post('http://localhost:3000/seller', data,
      { observe: 'response' }
    ).subscribe((result) => {
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller',JSON.stringify(result.body));
      this.router.navigate(['sellerHome']);
      console.warn("result", result);
    })
   
  }
userLogin(data:LoginData){

  // this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`
   this.http.get(`http://localhost:3000/seller?email=${data.email}` 
  ,{observe:'response'}).subscribe((result)=>{
     console.warn("result for loginData",result);
    if(result && result.body && (result.body as any).length){
       alert("user login successfully");
         this.isSellerLoggedIn.next(true);
         localStorage.setItem('seller',JSON.stringify(result.body));
         this.router.navigate(['sellerHome']);

    }else{
        console.warn("login failed");
        this.isLoginError.emit(true);
    }
  })
}

  reloadSeller(){
    if(localStorage.getItem('seller')){
        this.isSellerLoggedIn.next(true);
        this.router.navigate(['sellerHome']);
    }
  }
}
