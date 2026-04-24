import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../../services/seller.service';
import { Router } from '@angular/router';
import { SignupData } from '../../data-type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
    
],
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {
   authError:string="";
  constructor(private seller:SellerService,private router:Router){}
  ngOnInit(){
    this.seller.reloadSeller();
    // this.fresh();
  }
   
sellerData:any=[];

  fresh(){
     this.sellerData.name='';
     this.sellerData.email='';
     this.sellerData.password='';
  }

    onSubmit(sellerData: SignupData):void {
        this.seller.userSignup(sellerData)
        // .subscribe((response) => {
        //     console.log('Seller data submitted:', response);
        //     this.sellerData=response;
        //     alert('seller data submitted successfully');
        //     this.fresh();
        //     this.router.navigate(['/sellerHome']);
        // });
    }
  opLogin(sellerData: SignupData):void {
        this.seller.userLogin(sellerData)
        this.seller.isLoginError.subscribe((isError:boolean)=>{
            if(isError){
              //  alert('Login failed. please check your credentials and try again.');
                 this.authError="Invalid email or password";
            }
        })
       console.log('seller login data submitted:',sellerData);
    }

   showLogin=false;
    openLogin(){
      this.showLogin=true;
      //  this.router.navigate(['/sellerHome']);
    }
    openSignup(){
      this.showLogin=false;
    }
}
