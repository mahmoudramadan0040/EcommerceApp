import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import IUser from '../../../../../../Backend/src/interfaces/user.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private User:UserService) {

  }

  ngOnInit(): void {

  }

}
