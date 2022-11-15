import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../services/token_storage.service';
import IUser from '../../../../../../Backend/src/interfaces/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!:IUser;
  constructor(private tokenStroage:TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.tokenStroage.getUser().data.user_auth;
  }

}
