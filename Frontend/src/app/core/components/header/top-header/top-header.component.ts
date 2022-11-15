import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../../services/token_storage.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {
  displayModal:boolean|undefined;
  isLoggedIn :boolean |undefined;
  dashBoard:boolean|undefined;
  role:string[]= [];
  constructor(private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(this.isLoggedIn){
      const user = this.tokenStorageService.getUser();
      this.role = user.data.user_auth.role;
      this.dashBoard = this.role.includes('ADMIN');
      console.log(this.dashBoard);
    }
  }
  showModalDialog() {
    this.displayModal = true;
  }
  logout(){
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
