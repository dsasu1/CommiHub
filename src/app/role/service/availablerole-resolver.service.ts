import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AvailableRole } from '../model/role.model';
import { RolesService } from './role.service';
import { AppsessionService } from '../../service/appsession.service';

@Injectable()
export class AvailableRoleResolver implements Resolve<AvailableRole> {
  constructor(private roleService: RolesService, private router: Router, private appsession: AppsessionService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AvailableRole>  {
    let id = route.paramMap.get('id');

    return this.roleService.getAvailableRole(id).map(role => {
      if (role) {
        this.appsession.editItem = role;
        return role;
      }
      else {
        this.router.navigate(['']);
        return null;
      }

    }).catch(() => {
      this.router.navigate(['']);
      return Observable.of(null);
    })
  }

}
