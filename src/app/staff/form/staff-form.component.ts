import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppsessionService } from '../../service/appsession.service';
import { Staff } from '../model/staff.model';
import { ErrorMessage } from '../../model/utility.model';
import { UserSession } from '../../model/usersession.model';
import { AppConstants } from '../../common/AppConstants';
import { StaffsService } from '../service/staff.service';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html'
})
export class StaffFormComponent implements OnInit {
  isOpenForm: boolean = false;
  staffForm: Staff = new Staff();
  InfoMsg: ErrorMessage = new ErrorMessage();
  siteConstant: AppConstants = AppConstants;
  isSubmitted: boolean = false;
  constructor(private appsession: AppsessionService, private staffRepo: StaffsService) { }

  ngOnInit() {
  }

  openForm(open: boolean) {

    this.InfoMsg.clear();
    if (!open) {
      this.staffForm = new Staff();
    
    }
    this.isOpenForm = open;
  }

  saveStaff(form: NgForm) {
    this.InfoMsg.clear();
    if (form.valid) {
      this.isSubmitted = true;
      this.staffForm.creatorUserId = this.appsession.CurrentUser.userVM.id;
      this.staffRepo.saveStaff(this.staffForm).subscribe(
        data => {
          this.isSubmitted = false;
          this.appsession.setGlobalHeaderMessage();
          this.staffRepo.loadStaffs(this.appsession.CurrentUser.userVM.id);
          this.openForm(false);

        }
        ,
        error => {
          this.isSubmitted = false;
          let messages = this.appsession.getHttpErrorMessages(error);
          this.InfoMsg.addRange(messages);
          return;
        });
    }
  }

}
