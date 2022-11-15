import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token_storage.service';
@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private tokenStorage:TokenStorageService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    try{
      const role = this.tokenStorage.getUser().data.user_auth.role;
      console.log(role)
      if(role == 'ADMIN'){
        return true;
      }
      return false;
    }catch(err){
      return false;
    }
    // const role = this.tokenStorage.getUser().data.user_auth.role;
    // console.log(role)
    // if(role == 'ADMIN'){
    //   return true;
    // }

  }

}
