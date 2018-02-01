import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../service/BaseService';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Staff, StafffRole } from '../model/staff.model';
import { Subject } from 'rxjs';

@Injectable()
export class StaffsService extends AbstractRestService {
  private controller: string = "Staffs/";
  staffList: Staff[];
  staffListChange: Subject<Staff[]> = new Subject<Staff[]>()
  constructor(http: HttpClient) {
    super(http)

  }

  saveStaff(staff: Staff) {
    return this.postItem<boolean>(this.controller + "SaveStaff", staff);
  }

  saveRoleStaff(staff: StafffRole) {
    return this.postItem<boolean>(this.controller + "SaveRoleStaff", staff);
  }

  getStaffs(userId: string) {
    let httpParams: HttpParams = new HttpParams().append("userId", userId);
    return this.getItem<Staff[]>(this.controller + "GetStaffs", httpParams)
  }

  deleteStaffRole(userId: string, staffRoleId: string) {
    let httpParams: HttpParams = new HttpParams().append("userId", userId).append("staffRoleId", staffRoleId);
    return this.deleteItem<boolean>(this.controller + "DeleteStaffRole", httpParams)
  }

  deleteStaff(userId: string, staffId: string) {
    let httpParams: HttpParams = new HttpParams().append("userId", userId).append("staffId", staffId);
    return this.deleteItem<boolean>(this.controller + "DeleteStaff", httpParams)
  }

  loadStaffs(userId: string) {
    this.getStaffs(userId).subscribe(data => {
      this.staffList = data;
      this.staffListChange.next(data);
    });
  }
}
