import { Injectable } from '@angular/core';
import { UserAuthenticationGuard } from '../../service/UserAuthenticationGuard';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppsessionService } from '../../service/appsession.service';

@Injectable()
export class NewsGuard  {

  constructor(private route: Router, private appsession: AppsessionService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return true;
  }
}
