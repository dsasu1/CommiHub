import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppsessionService } from '../service/appsession.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { UsersService } from '../service/model.service';



@Injectable()
export class UserAuthenticationGuard implements CanActivate, CanActivateChild {
  constructor(private appsession: AppsessionService, private userService: UsersService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let currenUser = this.appsession.getCurrentUser();
    if (currenUser != null && currenUser.userVM != null && currenUser.userTypeEnum != null) {

      if (!this.appsession.IsUserLoggedIn) {
        if (state.url.indexOf("/property/") != -1 && currenUser == null) {
          return Observable.of(true);

        }
        return this.userService.verifyUserSession(currenUser.userVM).map(e => {
          if (e == true) {
            this.appsession.setIsLogIn(true, currenUser);
            return true;
          }
          else {
            
            this.appsession.logOut(true);
            
            return false;
          }

        }).catch(() => {

          this.appsession.logOut(true);
          this.appsession.redirectToRoute('', { queryParams: { returnUrl: state.url } });
          return Observable.of(false);
        });

      }
      else {
        return Observable.of(true);
      }

    }
    else {
      if (state.url.indexOf("/property/") != -1 || ["/aboutus", "/useragreement", "/privacypolicy", "/help"].indexOf(state.url) != -1) {
        return Observable.of(true);
      
      }
    }
    this.appsession.logOut(true);
    this.appsession.redirectToRoute('', { queryParams: { returnUrl: state.url } });
    return Observable.of(false);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

}
