import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

import IUser from 'src/app/interfaces/user.interface';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  displayModal: boolean | undefined= true;
  registerForm!:FormGroup ;
  isSuccessful:boolean = false;
  isSignUpFailed:boolean = false;
  errorMessage:string = '';
  submitted :boolean= false;
  constructor(
    private router: Router,
    private formbuilder:FormBuilder,
    private auth :AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      username:[null,Validators.compose([Validators.required,
      Validators.maxLength(200)])],
      firstname:[null,Validators.compose([Validators.required,
      Validators.maxLength(200)])],
      lastname:[null,Validators.compose([Validators.required,
      Validators.maxLength(200)])],
      password:[null,Validators.compose([Validators.required,
      Validators.minLength(6)])],
      email:[null,Validators.compose([Validators.required,
      Validators.email,Validators.maxLength(200)])]
    })
  }
  get registerFromControl(){
    return this.registerForm.controls;
  }

  onSubmit(){
    this.submitted =true;
    const user:IUser=this.registerForm.value;
    if(this.registerForm?.valid){
      console.log(user);
      console.log(this.registerForm.value);
      this.auth.register(user).subscribe(data =>{
        console.log(data);
        this.isSuccessful=true;
        this.isSignUpFailed=false;
        this.router.navigate(['/login']);
      },
      err =>{
        console.log(err);
        this.errorMessage =err;
        this.isSignUpFailed = true;

      })
    }
  }


  showModalDialog() {
    this.displayModal = true;
  }


  hideDialog(){
    this.router.navigate(['']);
  }
}
