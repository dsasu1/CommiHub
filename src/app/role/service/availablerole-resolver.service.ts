
import {of as observableOf,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { AvailableRole } from '../model/role.model';
import { RolesService } from './role.service';
import { AppsessionService } from '../../service/appsession.service';

@Injectable()
export class AvailableRoleResolver  {
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
