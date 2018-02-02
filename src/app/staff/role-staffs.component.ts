import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppsessionService } from '../service/appsession.service';
import { ErrorMessage } from '../model/utility.model';
import { UserSession } from '../model/usersession.model';
import { AppConstants,PsMaxLengths } from '../common/AppConstants';
import { Staff, StafffRole } from './model/staff.model';
import { AvailableRole } from '../role/model/role.model';
import { StaffsService } from './service/staff.service';

@Component({
  selector: 'app-role-staffs',
  templateUrl: './role-staffs.component.html'
})
export class RoleStaffsComponent implements OnInit, OnDestroy{
  InfoMsg: ErrorMessage = new ErrorMessage();
  role: AvailableRole;
  siteConstant: PsMaxLengths = new PsMaxLengths();
  staffForm: StafffRole = new StafffRole();
  //availableStaffdata: Staff[];
  dropDownData: Staff[];
  dropDownLabel: string;
  isOpenForm: boolean = false;
  private subscription: any;
  isSubmitted: boolean = false;

  constructor(private appsession: AppsessionService, private staffRepo: StaffsService) { }

  ngOnInit() {
    this.subscription  = this.staffRepo.staffListChange.subscribe(value => {

        if (value != null) {

          this.dropDownData = value.filter(x=>x.roleId == null);
        }

    });
    this.dropDownLabel = this.appsession.getTranslated(AppConstants.Select);
   // this.loadData();
    this.role = <AvailableRole>this.appsession.editItem;
  }

  onSubmitForm(form: NgForm) {
    this.InfoMsg.clear();
    if (form.valid) {
      this.isSubmitted = true;
      this.staffForm.roleId = this.role.id;
      this.staffForm.userId = this.appsession.CurrentUser.userVM.id;
      this.staffRepo.saveRoleStaff(this.staffForm).subscribe(data => {
        this.isSubmitted = false;
        this.loadData();
      },
        error => {
          this.isSubmitted = false;
        }
      )
    }
  }

  loadData() {
    if (this.appsession.IsUserLoggedIn) {

      this.staffRepo.loadStaffs(this.appsession.CurrentUser.userVM.id);
      //  .subscribe(data => {

      //  if (data != null) {
      //    this.availableStaffdata = data;
      
      //    this.dropDownData = this.availableStaffdata.filter(x=>x.roleId == null);
      //  }

      //})
    }
  }

  openForm(open: boolean) {
    this.InfoMsg.clear();
    if (!open) {
      this.staffForm = new StafffRole();
    }

    this.isOpenForm = open;
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}

