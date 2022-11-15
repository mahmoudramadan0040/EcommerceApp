import { Component, OnChanges, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api/primengconfig';
import { productService } from '../../../services/product.service';
import IProduct from '../../../interfaces/product.interface';
import { ProductShareService } from '../../../services/product-share.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit  {
  products:IProduct[] =[];
  productEmpty:boolean = false;
  numberPage:number = 0;
  constructor(
    private productService:productService,
    private productShareService:ProductShareService
  ) { }
  ngOnInit(): void {
    this.getProduct()
    this.productShareService.searchProduct$.subscribe({
      next:(searchedProduct:any)=>{
        this.products = searchedProduct;
        if(this.products.length==0) this.productEmpty=true;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  getProduct(){
    this.productService.getProductPage(this.numberPage.toString()).subscribe({
      next:(products) =>{
        console.log(products.data.product);
        this.products = products.data.product;
        if(this.products.length==0) this.productEmpty=true;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
  onClickPage(index:number){
    this.numberPage = index;
    console.log(index);
    this.getProduct();
  }
}
