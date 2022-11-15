import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { TokenStorageService } from 'src/app/services/token_storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  displayModal: boolean | undefined= true;
  loginForm!:FormGroup ;
  submitted :boolean= false;
  isLoggedIn:boolean = false;
  isLoginFailed:boolean = false;
  roles: string[] = [];
  errorMessage = '';
  constructor(
    private router: Router,
    private formbuilder:FormBuilder,
    private authService:AuthService,
    private tokenStorage: TokenStorageService
  ) { }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.loginForm = this.formbuilder.group(
      {
        email:[null,Validators.compose([Validators.required,Validators.email,Validators.maxLength(200)])],
        password:[null,Validators.compose([Validators.required,Validators.minLength(6)])]
      }
    )
  }
  get loginFormControl(){
    return this.loginForm.controls;
  }
  onSubmit() {
    console.log("work")
    this.submitted = true;
    const {password,email}= this.loginForm.value;
    if (this.loginForm?.valid) {
      this.authService.login(email,password).subscribe(
        data => {
        console.log(data.data.token);
        this.tokenStorage.saveToken(data.data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.router.navigate(['']).then(()=>{
          this.reloadPage();
        });
        // this.reloadPage();
      },
      err =>{
        console.log(err);
        this.errorMessage = err;
        this.isLoginFailed = true;
      })
    }
  }
  showModalDialog() {
    this.displayModal = true;
  }

  hideDialog(){
    this.router.navigate(['']);
  }
  reloadPage(): void {
    window.location.reload();
  }
}


