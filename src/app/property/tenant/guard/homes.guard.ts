import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppsessionService } from '../../../service/appsession.service';
import { UserTypeEnum } from '../../../common/AppConstants';

@Injectable()
export class HomesGuard  {
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    return this.canActivate(childRoute, state);
  }

  constructor(private router: Router, private appsession: AppsessionService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let currentUser = this.appsession.getCurrentUser();

    if (currentUser != null) {

      if (currentUser.userTypeEnum == UserTypeEnum[UserTypeEnum.Tenant]) {
        return true;
      }
      else {
        this.router.navigate[''];
        return false;
      }
    }

    this.router.navigate[''];
    return false;
  }

}
