
import {of as observableOf,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppsessionService } from '../service/appsession.service';

import { UsersService } from '../service/model.service';



@Injectable()
export class UserAuthenticationGuard implements CanActivate, CanActivateChild {
  constructor(private appsession: AppsessionService, private userService: UsersService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let currenUser = this.appsession.getCurrentUser();
    if (currenUser != null && currenUser.userVM != null && currenUser.userTypeEnum != null) {

      if (!this.appsession.IsUserLoggedIn) {
        if (state.url.indexOf("/property/") != -1 && currenUser == null) {
          return observableOf(true);

        }
        return this.userService.verifyUserSession(currenUser.userVM).pipe(map(e => {
          if (e == true) {
            this.appsession.setIsLogIn(true, currenUser);
            return true;
          }
          else {
            
            this.appsession.logOut(true);
            
            return false;
          }

        }),catchError(() => {

          this.appsession.logOut(true);
          this.appsession.redirectToRoute('', { queryParams: { returnUrl: state.url } });
          return observableOf(false);
        }),);

      }
      else {
        return observableOf(true);
      }

    }
    else {
      if (state.url.indexOf("/property/") != -1 || ["/aboutus", "/useragreement", "/privacypolicy", "/help"].indexOf(state.url) != -1) {
        return observableOf(true);
      
      }
    }
    this.appsession.logOut(true);
    this.appsession.redirectToRoute('', { queryParams: { returnUrl: state.url } });
    return observableOf(false);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

}
