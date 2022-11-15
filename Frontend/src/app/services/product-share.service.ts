import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import IProduct from '../interfaces/product.interface';


export enum Events{
  'share Product service',
   // other events here
  }
@Injectable({
  providedIn: 'root'
})
export class ProductShareService {
  private product$ = new BehaviorSubject<any>({});
  private cartProduct$=  new BehaviorSubject<any>({});
  private products =new Set();
  private productCart:any[] =[];
  selectedCartProduct$ =this.cartProduct$.asObservable();
  searchProduct$ = this.product$.asObservable();
  constructor() { }

  setProduct(product:any){
    this.product$.next(product);
  }

  setCartProduct(product:any){
    this.products.add(product)
    this.productCart = Array.from(this.products);
    this.cartProduct$.next(this.productCart);
  }
  deleteCartProduct(product:any){
    this.products.delete(product);
    this.productCart = Array.from(this.products);
    this.cartProduct$.next(this.productCart);
  }
}
