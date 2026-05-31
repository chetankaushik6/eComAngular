import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginData, SignupData } from '../../data-type';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
showLogin: boolean = false;
authError:string='';
  constructor(private userService: UsersService){}

ngOnInit(): void {
    this.userService.userAuthReload();
}

  onSignup(userData: SignupData) {
    // console.log(userData);
    this.userService.userSignup(userData);
  }

  onLogin(userData:LoginData){
    // console.log("000000",userData);
       this.userService.userLogin(userData);
       this.userService.InvaliduserAuth.subscribe((isInvalid)=>{
            if(isInvalid){
                this.authError='Invalid login credentials';
            } else {
                this.authError='';
            }
       });
  }

  openLogin(){
    this.showLogin=true;
  }
  openSignup(){
    this.showLogin=false;
  }
}
