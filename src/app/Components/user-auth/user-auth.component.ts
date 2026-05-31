import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignupData } from '../../data-type';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {

  constructor(private userService: UsersService){}

ngOnInit(): void {
    this.userService.userAuthReload();
}

  onSignup(userData: SignupData) {
    // console.log(userData);
    this.userService.userSignup(userData);
  }
}
