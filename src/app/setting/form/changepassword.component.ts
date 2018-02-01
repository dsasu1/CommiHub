import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AppConstants, ChangeType } from '../../common/AppConstants';
import { UsersService } from '../../service/model.service';
import { UserType, User } from '../../model/users.model';
import { UserSession } from '../../model/usersession.model';
import { AppsessionService } from '../../service/appsession.service';
import { ErrorMessage, MessageDetail } from '../../model/utility.model';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html'
})
export class ChangepasswordComponent implements OnInit {
  changePassMsg: ErrorMessage = new ErrorMessage();
  siteConstant: AppConstants = AppConstants;
  currentUser: UserSession;
  user: User;
  isSubmitted: boolean = false;
   constructor(private userSource: UsersService, private appsession: AppsessionService) { }

   ngOnInit() {
     if (this.appsession.IsUserLoggedIn) {
       this.currentUser = this.appsession.CurrentUser;
       this.user = Object.assign({}, this.currentUser.userVM);
     }
 
  }

   onSubmitChange(form: NgForm) {

     if (this.currentUser.userVM.isDemoAccount) {
       let message: MessageDetail = new MessageDetail();
       message.isInfo = true;
       message.msg = this.appsession.getTranslated("DemoFunctionalityLimited");
       this.appsession.setGlobalHeaderMessage(message);
       return;
     }


      this.changePassMsg.clear();
      if (form.valid) {
          if (this.user.newPassword !== this.user.confirmPassword) {

              this.changePassMsg.add(this.appsession.getTranslated(AppConstants.ConfirmPasswordMatchError));
              return;
        }
          this.isSubmitted = true;
          this.user.changeType = ChangeType[ChangeType.PasswordChange];
          this.userSource.SaveUserInfo(this.user).subscribe(
            data => {
              this.isSubmitted = false;
              this.appsession.setGlobalHeaderMessage();
                  this.user.changeType = null;
                  this.user.password = null;
                  this.user.newPassword = null;
                  this.user.confirmPassword = null;
                  this.currentUser.userVM = this.user;
                  this.appsession.updateCurrentUserSession(this.currentUser);
                  form.reset();
                  return;
              },
              error => {
                this.isSubmitted = false;
                  let messages = this.appsession.getHttpErrorMessages(error);
                  this.changePassMsg.addRange(messages);
                  return;
              }
          )
      }
  }

  onCancel() {
      this.user = this.appsession.getCurrentUser().userVM;

  }
}
