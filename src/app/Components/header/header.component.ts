import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,NgIf,CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType:string='default';
  sellerName:string='';
   constructor(private router:Router){}
   
   ngOnInit():void{
       this.router.events.subscribe((val:any)=>{
            console.log("router event",val.url);
            if(val.url){
              if(localStorage.getItem('seller') && val.url.includes('seller')){
                   console.warn('inside seller area',val.url);
                   this.menuType='seller';
if(localStorage.getItem('seller')){
    let sellerStore =localStorage.getItem('seller');
    let sellerData = sellerStore && JSON.parse(sellerStore)[0];
    this.sellerName= sellerData.name;
}

              }else{
                 console.warn(' outside seller area',val.url);
                    this.menuType='default';
                }
            }
       })
   }

   logout(){
    localStorage.removeItem('seller');
    alert("User logout successfully!")
    this.router.navigate(['/']);
   }
}
