import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { productService } from '../../../services/product.service';
import IProduct from '../../../interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';
declare function mainScript() :any;
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {

  Product:IProduct|undefined;

  constructor(private productService:productService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    setTimeout(mainScript,300);
    console.log(this.route.snapshot.paramMap.get('id'))
    this.getProduct();
  }
  // retrive the product
  getProduct(){
    let id = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id as string).subscribe({
      next:(product)=>{
        this.Product = product.data.product[0];
        console.log(this.Product)
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}
