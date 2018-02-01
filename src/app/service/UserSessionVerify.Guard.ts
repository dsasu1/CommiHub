import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppsessionService } from '../service/appsession.service';
import { UsersService } from '../service/model.service';


//@Injectable()
//export class UserVerifySessionGuard implements CanActivate {

//  constructor(private route: Router, private appsession: AppsessionService, private userService: UsersService ) { }
//  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//    let currenUser = this.appsession.getCurrentUser();

//    if (currenUser != null && currenUser.userVM != null && currenUser.userTypeVM != null) {

//      if (!this.appsession.IsUserLoggedIn) {

//        re
//      }

//      return true;
//    }
//    else if (state.url.indexOf("/property/") != -1) {

//      return true;

//    }

//    this.route.navigate([''], { queryParams: { returnUrl: state.url } });
//    return false;
//  }

//  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//    return this.canActivate(route, state);
//  }

//}
