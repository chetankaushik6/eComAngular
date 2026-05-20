import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductData } from '../../data-type';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  popularProducts: undefined|ProductData[];

  constructor(private product: ProductsService){}

  ngOnInit():void{
     this.product.popularProducts().subscribe((result)=>{
         this.popularProducts = result;
         console.log("popular products", result);
     });
  }

//  carouselImages = [
//     'assets/banner1.jpg',
//     'assets/banner2.jpg',
//     'assets/banner3.jpg',
//     'assets/banner4.jpg',
//     'assets/banner5.jpg',
//     'assets/banner6.jpg',
//     'assets/banner7.jpg',
//     'assets/banner8.jpg'
//   ];

carouselImages = [
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400',
  'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1400',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400',
  'https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1400',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1400'
];

}
