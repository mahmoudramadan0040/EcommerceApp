import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import IProduct from 'src/app/interfaces/product.interface';
import { productService } from '../../../services/product.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashbard-product',
  templateUrl: './dashbard-product.component.html',
  styleUrls: ['./dashbard-product.component.css'],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
})
export class DashbardProductComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  productEditDialog!: boolean;
  productCreateDialog!:boolean;
  products!: IProduct[];
  product!: any;
  selectedProducts!: IProduct[];
  submitted!: boolean;
  uploadedFiles:any =new Set();
  productForm!:FormGroup;
  // multiple:boolean= false;

  constructor(
    private productService: productService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formbuilder:FormBuilder,
  ) {}

  ngOnInit() {
    this.productService.getallProduct().subscribe({
      next:(products)=>{
        console.log(products.data.product);
        this.products=products.data.product;
      }
    })

    this.productForm = this.formbuilder.group({
      title:[null,Validators.required],
      price:[null,Validators.required],
      details:[null,Validators.required],
      category:[null,Validators.required],
      ProdQuantity:[null,Validators.required],
      images:[null]
    })
  }

  // create Product
  onSubmit(){
    console.log("hellow")
    this.submitted = true;
    const formData = new FormData();
    this.uploadedFiles.forEach((file:any) => {
      formData.append('images',file)
    });
    formData.append('title',this.productForm.value.title);
    formData.append('price',this.productForm.value.price)
    formData.append('details',this.productForm.value.details)
    formData.append('ProdQuantity',this.productForm.value.ProdQuantity)
    if(this.productForm.valid){
      console.log(this.productForm.value);
      console.log(this.uploadedFiles);
      this.productService.createProduct(formData).subscribe({
        next:(data)=>{
          console.log(data);
        }
      })
    }
  }



  onUpload(event:any){
    console.log("file uploaded in on upload")
    for(let file of event.files) {
      this.uploadedFiles.add(file);
    }
  }
  removeFileUpload(event:any){
    this.uploadedFiles.delete(event.file)
  }
  openNew() {
    this.product = {};
    this.submitted = false;
    this.productCreateDialog = true;
  }
  // done
  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products.map((product)=>{
          console.log(product._id)
          this.productService.deleteProduct(product._id).subscribe({
            next:(data)=>{
              console.log(data.message)
            }
          })
        })
        this.products = this.products.filter(
          (val) => !this.selectedProducts.includes(val)
        );


        this.selectedProducts = [];

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted successfully !',
          life: 3000,
        });
      },
    });
  }

  editProduct(product: IProduct) {
    this.product = { ...product };
    this.productEditDialog = true;
  }

  // done
  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.productService.deleteProduct(product._id).subscribe({
          next:(data)=>{
            console.log(data.message)
          }
        })
        this.products = this.products.filter((val) => val._id !== product._id);
        this.product = {};

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted Successfully ! ',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.productEditDialog = false;
    this.productCreateDialog =false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.products = [...this.products];
      this.productEditDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i]._id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
