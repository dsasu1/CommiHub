import { Component, OnInit, Input , OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Staff } from '../model/staff.model';
import { StaffsService } from '../service/staff.service';
import { AppsessionService } from '../../service/appsession.service';
import { MessageDetail } from '../../model/utility.model';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html'
})
export class StaffListComponent implements OnInit, OnDestroy {
  availabledata: Staff[];
  @Input() roleId: string;
  currentdata: Staff[] = new Array<Staff>();
  private subscription: any;
  constructor(private appsession: AppsessionService, private staffRepo: StaffsService, private router: Router) { }


  trackingBy(index: number, data: Staff): string { return data.id; }

  ngOnInit() {
    this.subscription = this.staffRepo.staffListChange.subscribe(value => {

      this.availabledata = value;

      if (this.roleId != null && this.availabledata != null) {
        this.availabledata = this.availabledata.filter(x => x.roleId == this.roleId);
      }

      if (this.availabledata != null) {
        this.currentdata = this.appsession.paginate(this.availabledata, this.appsession.defaultPageSize, this.appsession.defaultPageSize);
      }

    });

    this.loadData();
   
  }


  loadData() {
    if (this.appsession.IsUserLoggedIn) {

      this.staffRepo.loadStaffs(this.appsession.CurrentUser.userVM.id);
    }


  }

  getRoleName(roleName: string): string {

    return roleName == null ? "NoRole" : roleName;
  }

  ondeleteStaff(index: number) {

    if (this.currentdata[index].isDemoAccount) {
      let message: MessageDetail = new MessageDetail();
      message.isInfo = true;
      message.msg = this.appsession.getTranslated("DemoFunctionalityLimited");
      this.appsession.setGlobalHeaderMessage(message);
      return;
    }

    if (this.roleId != null) {
      this.staffRepo.deleteStaffRole(this.appsession.CurrentUser.userVM.id, this.currentdata[index].staffRoleId).subscribe(data => {

        if (data) {
          this.loadData();
        }

      });
    }
    else {
      this.staffRepo.deleteStaff(this.appsession.CurrentUser.userVM.id, this.currentdata[index].id).subscribe(data => {

        if (data) {
          this.loadData();
        }

      });
    }

  }

  GetImageUrl(userPhoto: string) {
    let result = this.appsession.getImageData(userPhoto, 'image', '../../../assets/img/avatar1.jpg');
    return result;

  }

  navigateToRole(roleId: string) {
    this.router.navigate(['/managerole', roleId]);
    return;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
