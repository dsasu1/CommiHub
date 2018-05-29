
import {of as observableOf,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { AvailableRole } from '../model/role.model';
import { RolesService } from './role.service';
import { AppsessionService } from '../../service/appsession.service';

@Injectable()
export class AvailableRoleResolver implements Resolve<AvailableRole> {
  constructor(private roleService: RolesService, private router: Router, private appsession: AppsessionService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AvailableRole>  {
    let id = route.paramMap.get('id');

    return this.roleService.getAvailableRole(id).pipe(map(role => {
      if (role) {
        this.appsession.editItem = role;
        return role;
      }
      else {
        this.router.navigate(['']);
        return null;
      }

    }),catchError(() => {
      this.router.navigate(['']);
      return observableOf(null);
    }),)
  }

}
