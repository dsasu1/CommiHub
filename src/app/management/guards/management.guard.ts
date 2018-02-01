import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppsessionService } from '../../service/appsession.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { UsersService } from '../../service/model.service';



@Injectable()
export class ManagementGuard implements CanActivate, CanActivateChild {
  constructor(private route: Router, private appsession: AppsessionService, private userService: UsersService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let currenUser = this.appsession.getCurrentUser();
    if (currenUser!= null && this.appsession.IsHasManageRights) {
      return Observable.of(true);
    }
    else if (currenUser != null) {
      return this.userService.userHasManagementRights(currenUser.userVM).map(e => {
        if (e == true) {
          this.appsession.IsHasManageRights = true;
          return true;
        }
        else {
          this.route.navigate(['/newsfeed']);
          return false;
        }
      }).catch(() => {
        this.route.navigate(['/newsfeed']);
        return Observable.of(false);
      })
    }

    this.route.navigate(['/newsfeed']);
    return Observable.of(false);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

}
