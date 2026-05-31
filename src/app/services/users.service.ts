import { Injectable } from '@angular/core';
import { SignupData } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
 

  constructor(private http: HttpClient,private router: Router) { }

  userSignup(userData:SignupData){
     this.http.post('http://localhost:3000/users', userData).subscribe((result)=>{
          console.log(result);
          if(result){
              localStorage.setItem('user', JSON.stringify(result)); 
              this.router.navigate(['/']);
          }
     });
  }

  userAuthReload(){
     if(localStorage.getItem('user')){
         this.router.navigate(['/']);
     }
  }
}
