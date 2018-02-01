import { Component, OnInit , Input} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppsessionService } from '../../service/appsession.service';
import { AvailableRole } from '../model/role.model';
import { ErrorMessage, MessageDetail } from '../../model/utility.model';
import { UserSession } from '../../model/usersession.model';
import { AppConstants } from '../../common/AppConstants';
import { RolesService } from '../service/role.service';

@Component({
  selector: 'app-roleform',
  templateUrl: './roleform.component.html'
})
export class RoleformComponent implements OnInit {
  @Input() isManage: boolean = false;
  @Input() role: AvailableRole;

  isOpenForm: boolean = false;
  InfoMsg: ErrorMessage = new ErrorMessage();
  siteConstant: AppConstants = AppConstants;
  isSubmitted: boolean = false;
  constructor(private appsession: AppsessionService, private roleRepo: RolesService) { }

  ngOnInit() {
    this.isOpenForm = this.isManage;
    if (this.role == null) {
      this.role = new AvailableRole();
    }
  }

  openForm(open: boolean) {
    this.InfoMsg.clear();
    if (!open) {
      this.role = new AvailableRole();
    }
 
    this.isOpenForm = open;
  }

  saveAvailableRole(form: NgForm) {
    if (this.role.isDemoAccount) {
      let message: MessageDetail = new MessageDetail();
      message.isInfo = true;
      message.msg = this.appsession.getTranslated("DemoFunctionalityLimited");
      this.appsession.setGlobalHeaderMessage(message);
      return;
    }
    this.InfoMsg.clear();
    if (form.valid) {
      this.isSubmitted = true;
      this.role.creatorUserId = this.appsession.CurrentUser.userVM.id;
      this.roleRepo.saveAvailableRole(this.role).subscribe(
        data => {
          this.isSubmitted = false;
          this.appsession.setGlobalHeaderMessage();

          if (!this.isManage) {
            this.roleRepo.loadAvailableRoles(this.appsession.CurrentUser.userVM.id);
            this.openForm(false);

          }
         
         
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
