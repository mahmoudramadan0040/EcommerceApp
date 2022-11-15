import { Component, OnInit } from '@angular/core';
interface Iproduct{
  name?:string;

}
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})

export class NewProductComponent implements OnInit {
  responsiveOptions;
  product:Iproduct[];

  constructor() {
    this.product =[{
      name:"mahmoud"
    },{name:"ahmed"}]
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
   }

  ngOnInit(): void {
  }

}
