import { Component, Input, OnInit } from '@angular/core';
import IProduct from '../../../interfaces/product.interface';
import { ProductShareService } from '../../../services/product-share.service';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product:IProduct | undefined;
  status:string ='';
  constructor(private productShareService:ProductShareService) { }
  ngOnInit(): void {
    this.checkstatus()
  }
  // check this status if product in stock or not or low
  checkstatus(){
    if(this.product?.ProdQuantity as number >3){
      this.status ='In Stock';
    }
    else if(this.product?.ProdQuantity as number <= 3 && this.product?.ProdQuantity as number > 0 ){
      this.status ='Low Stock';
    }
    else if(this.product?.ProdQuantity == 0){
      this.status ='Out Stock'
    }
  }
  addToCart(){
    console.log(this.product);
    this.productShareService.setCartProduct(this.product);
  }
}
