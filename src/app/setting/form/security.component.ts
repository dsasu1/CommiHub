import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AppConstants, ChangeType } from '../../common/AppConstants';
import { UsersService, GlobalService } from '../../service/model.service';
import { UserType, User } from '../../model/users.model';
import { SecurityQuestions } from '../../model/global.model';
import { UserSession } from '../../model/usersession.model';
import { AppsessionService } from '../../service/appsession.service';
import { ErrorMessage, MessageDetail} from '../../model/utility.model';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html'
})
export class SecurityComponent implements OnInit {
  secQuestions: SecurityQuestions[] = new Array<SecurityQuestions>();
  securityMsg: ErrorMessage = new ErrorMessage();
  siteConstant: AppConstants = AppConstants;
  currentUser: UserSession;
  user: User;
  isSubmitted: boolean = false;
  constructor(private userSource: UsersService, private appsession: AppsessionService, private globalSource: GlobalService) { }

  ngOnInit() {
    if (this.appsession.IsUserLoggedIn) {
      this.currentUser = this.appsession.CurrentUser;
      this.user = Object.assign({}, this.currentUser.userVM);
       this.globalSource.getSecQuestions().subscribe(data => this.secQuestions = data);
     }
  }

  onSubmitQuestion(form: NgForm)
  {
    if (this.currentUser.userVM.isDemoAccount) {
      let message: MessageDetail = new MessageDetail();
      message.isInfo = true;
      message.msg = this.appsession.getTranslated("DemoFunctionalityLimited");
      this.appsession.setGlobalHeaderMessage(message);
      return;
    }
      this.securityMsg.clear();
      if (form.valid) {
        this.isSubmitted = true;
          this.user.changeType = ChangeType[ChangeType.SecurityQuestion];
          this.userSource.SaveUserInfo(this.user).subscribe(
            data => {
              this.isSubmitted = false;
              this.appsession.setGlobalHeaderMessage();
                  this.user.changeType = null;
                  this.user.password = null;
                  this.user.userSecurityAns = null;
                  this.currentUser.userVM = this.user;
                  this.appsession.updateCurrentUserSession(this.currentUser);
                  return;
              },
              error => {
                this.isSubmitted = false;
                  let messages = this.appsession.getHttpErrorMessages(error);
                  this.securityMsg.addRange(messages);
                  return;
              }
          )
      }
  }

  onCancel() {
      this.user = this.appsession.getCurrentUser().userVM;
  }

}
