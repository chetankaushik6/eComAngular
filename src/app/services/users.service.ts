import { EventEmitter, Injectable } from '@angular/core';
import { LoginData, SignupData } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
 InvaliduserAuth =new EventEmitter<boolean>(false);

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

  // userLogin(userData:LoginData){
  //     this.http.get(`http://localhost:3000/users?email=${userData.email}&password=${userData.password}`,{observe:'response'})
  //     .subscribe((result:any)=>{
  //         console.log(result);
  //         if(result){
  //             localStorage.setItem('user', JSON.stringify(result)); 
  //             this.router.navigate(['/']);
  //         }
  //     });
  // }

  userLogin(userData:LoginData){
    this.http.get<SignupData[]>(`http://localhost:3000/users?email=${userData.email}`)
      .subscribe({
        next: (users) => {
          console.warn("result for loginData", users);
          if (users && users.length > 0) {
            const loggedUser = users[0];
            alert("user login successfully");
            localStorage.setItem('user', JSON.stringify(loggedUser));
            console.log('saved-user', loggedUser);
             this.InvaliduserAuth.emit(false);
            this.router.navigate(['/']);
          } else {
            this.InvaliduserAuth.emit(true);
            console.warn("login failed");
            alert('Invalid login credentials');
          }
        },
        error: (err) => {
          console.error('Login error', err);
          alert('Login failed. Please try again.');
        }
      });
  }

  userAuthReload(){
     if(localStorage.getItem('user')){
         this.router.navigate(['/']);
     }
  }
}
