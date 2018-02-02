import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppsessionService } from '../../../service/appsession.service';
import { ErrorMessage } from '../../../model/utility.model';
import { UserSession } from '../../../model/usersession.model';
import { PsMaxLengths } from '../../../common/AppConstants';
import { TenantUnit } from '../../model/property.model';
import { PropertyService } from '../../service/property.service';

@Component({
  selector: 'app-newhome-form',
  templateUrl: './newhome-form.component.html',
  styles: []
})
export class NewhomeFormComponent implements OnInit {
  isOpenForm: boolean = false;
  unitForm: TenantUnit = new TenantUnit();
  InfoMsg: ErrorMessage = new ErrorMessage();
  siteConstant: PsMaxLengths = new PsMaxLengths();
  isSubmitted: boolean = false;
  constructor(private appsession: AppsessionService, private propService: PropertyService) { }


  openForm(open: boolean) {

    this.InfoMsg.clear();
    if (!open) {
      this.unitForm = new TenantUnit();

    }
    this.isOpenForm = open;
  }

  ngOnInit() {
  }


  saveHome(form: NgForm) {
    this.InfoMsg.clear();
    if (form.valid) {
      this.isSubmitted = true;
      this.unitForm.userId = this.appsession.CurrentUser.userVM.id;
      this.propService.saveTenantHome(this.unitForm).subscribe(
        data => {
          this.isSubmitted = false;
          this.appsession.setGlobalHeaderMessage();
          this.propService.loadUserProperties(this.appsession.CurrentUser.userVM.id);
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
