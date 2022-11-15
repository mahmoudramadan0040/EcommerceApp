import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { productService } from '../../../../services/product.service';
import { ProductShareService } from '../../../../services/product-share.service';
import IProduct from '../../../../interfaces/product.interface';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
})
export class MainHeaderComponent implements OnInit, OnChanges {
  products$: IProduct[] = [];
  numberProductInCart: number = 0;
  totalPrice: number = 0;
  constructor(
    private productService: productService,
    private formbuilder: FormBuilder,
    private productShareService: ProductShareService
  ) {}
  searchForm!: FormGroup;

  ngOnInit(): void {
    this.searchForm = this.formbuilder.group({
      searchInput: [null, Validators.required],
    });
  }
  ngOnChanges() {
    this.productShareService.selectedCartProduct$.subscribe({
      next: (data) => {
        console.log(data.length);
        this.numberProductInCart = data.length;
      },
    });
  }
  get searchFormControl() {
    return this.searchForm.controls;
  }
  // cart functions
  getProductCart() {
    this.productShareService.selectedCartProduct$.subscribe({
      next: (productCart) => {
        console.log('product cart added ');
        console.log(productCart);
        this.products$ = productCart;
        this.totalPrice = this.products$.map(x => parseInt(x.price.toString()))
        .reduce((total:number, value:number) => total as number + value as number)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteFromCart(product: IProduct) {
    this.productShareService.deleteCartProduct(product);
  }
  // search functions
  onSubmit() {
    if (this.searchForm?.valid) {
      this.Search(this.searchForm.value.searchInput);
    }
  }
  Search(query: string) {
    console.log(query);
    this.productService.searchProduct(query).subscribe({
      next: (searcProduct) => {
        console.log(searcProduct.data.product);
        this.productShareService.setProduct(searcProduct.data.product);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
