import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../service/BaseService';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AvailableRole } from '../model/role.model';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class RolesService extends AbstractRestService {
  private controller: string = "Roles/";
  availableRoleList: AvailableRole[];
  availableRoleListChange: Subject<AvailableRole[]> = new Subject<AvailableRole[]>();
  constructor(http: HttpClient) {
    super(http)

  }
  saveAvailableRole(avialableRole: AvailableRole) {
    return this.postItem<boolean>(this.controller + "SaveAvailableRole", avialableRole);
  }

  getAvailableRoles(userId: string) {
    let httpParams: HttpParams = new HttpParams().append("userId", userId);
    return this.getItem<AvailableRole[]>(this.controller + "GetAvailableRoles", httpParams)
  }

  deleteAvailableRole(userId: string, roleId: string) {
    let httpParams: HttpParams = new HttpParams().append("userId", userId).append("roleId", roleId);
    return this.deleteItem<boolean>(this.controller + "DeleteAvailableRole", httpParams)
  }

  getAvailableRole(id: string) {
    let httpParams: HttpParams = new HttpParams().append("id", id);
    return this.getItem<AvailableRole>(this.controller + "GetAvailableRole", httpParams)
  }

  loadAvailableRoles(userId: string) {
    this.getAvailableRoles(userId).subscribe(data => {
      this.availableRoleList = data;
      this.availableRoleListChange.next(data);
    });
  }
}
