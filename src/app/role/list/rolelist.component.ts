import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AvailableRole } from '../model/role.model';
import { RolesService } from '../service/role.service';
import { AppsessionService } from '../../service/appsession.service';
import { MessageDetail } from '../../model/utility.model';

@Component({
  selector: 'app-rolelist',
  templateUrl: './rolelist.component.html'
})
export class RolelistComponent implements OnInit, OnDestroy {
  availabledata: AvailableRole[];
  currentdata: AvailableRole[] = new Array<AvailableRole>();
  private subscription: any;
  constructor(private appsession: AppsessionService, private rolesRepo: RolesService, private router: Router) { }

  trackingBy(index: number, data: AvailableRole): string { return data.id; }

  ngOnInit() {
    this.subscription = this.rolesRepo.availableRoleListChange.subscribe(value => {
      this.availabledata = value;

      if (this.availabledata != null) {
        this.currentdata = this.appsession.paginate(this.availabledata, this.appsession.defaultPageSize, this.appsession.defaultPageSize);
      }
    });

    this.loadData();
  }

  loadData() {
    if (this.appsession.IsUserLoggedIn) {
      this.rolesRepo.loadAvailableRoles(this.appsession.CurrentUser.userVM.id);

    }
  }

  navigateToRole(role: AvailableRole) {
    this.appsession.editItem = role;
    this.router.navigate(['/managerole', role.id]);
    return;
  }

  ondeleteRole(index: number) {

    if (this.currentdata[index].isDemoAccount) {
      let message: MessageDetail = new MessageDetail();
      message.isInfo = true;
      message.msg = this.appsession.getTranslated("DemoFunctionalityLimited");
      this.appsession.setGlobalHeaderMessage(message);
      return;
    }
    this.rolesRepo.deleteAvailableRole(this.appsession.CurrentUser.userVM.id, this.currentdata[index].id).subscribe(data => {

      if (data) {
        this.loadData();
      }

    });

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
