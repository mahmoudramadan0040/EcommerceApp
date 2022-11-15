import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import IProduct from '../interfaces/product.interface';
const httpOptions = {
  headers: new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
};
const httpFromOptions ={
  headers: new HttpHeaders({
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'multipart/form-data',
  })
}
@Injectable({
  providedIn: 'root'
})
export class productService {
  constructor(private http:HttpClient) { }
  private apiUrl: string =environment.apiUrl+'/product';
  // get all product for admin
  getallProduct():Observable<any>{
    return this.http.get<IProduct[]>(this.apiUrl).pipe(
      tap(products => console.log(products)),
      catchError(this.errorHandler)
    )
  }
  // get products for page or lazy loading 12 product
  getProductPage(id:string):Observable<any>{
    return this.http.get<IProduct[]>(this.apiUrl+'/page/'+id)
    .pipe(
      tap(products => console.log(products)),
      catchError(this.errorHandler)
    )
  }
  // get one product
  getProduct(id:string):Observable<any>{
    console.log(id);
    return this.http.get<IProduct>(this.apiUrl+'/'+id)
    .pipe(
      tap(product => console.log(product)),
      catchError(this.errorHandler)
    )
  }
  //create product and upload image for product
  createProduct(product:any):Observable<IProduct>{
    console.log(product);
    return this.http.post<IProduct>(this.apiUrl,product)
    .pipe(
      tap(data=> console.log(data)),
      catchError(this.errorHandler)
    )
  }
  // update product
  updateProduct(product:any):Observable<IProduct>{
    console.log(product);
    return this.http.put<IProduct>(this.apiUrl,product).pipe(
      tap(data=> console.log(data)),
      catchError(this.errorHandler)
    );
  }
  // delete product
  deleteProduct(id:string):Observable<any>{
    return this.http.delete<any>(this.apiUrl+'/'+id)
    .pipe(
      tap(data => console.log(data.message)),
      catchError(this.errorHandler)
    )
  }


  searchProduct(query:string):Observable<any>{
    console.log(query);
    let queryParams =new HttpParams().append("ProductQuery",query);
    return this.http.get<any>(this.apiUrl+'/search',{params:queryParams}).pipe(
      tap(products => console.log(products)),
      catchError(this.errorHandler)
    )

  }












  errorHandler(error:any) {
    console.log(error)
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
      console.log(errorMessage)
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
