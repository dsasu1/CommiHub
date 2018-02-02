import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/model.service';
import { UserType, User } from '../../model/users.model';
import { UserSession } from '../../model/usersession.model';
import { AppsessionService } from '../../service/appsession.service';
import { ErrorMessage } from '../../model/utility.model'; 
import { PsMaxLengths} from '../../common/AppConstants';
import { NgForm } from "@angular/forms";
import { MessageDetail } from '../../model/utility.model';

@Component({
  selector: 'app-deactivateaccount',
  templateUrl: './deactivateaccount.component.html',
  styles: []
})
export class DeactivateaccountComponent implements OnInit {
  infoMsg: ErrorMessage = new ErrorMessage();
  siteConstant: PsMaxLengths = new PsMaxLengths();
  currentPasswod: string;
  isDeactivateConfirm: boolean = false;
  user: User = new User();
  isSubmitted: boolean = false;
  constructor(private userSource: UsersService, private appsession: AppsessionService) { }


  onSubmitDeactivate(form: NgForm) {

    if (this.appsession.CurrentUser.userVM.isDemoAccount) {
      let message: MessageDetail = new MessageDetail();
      message.isInfo = true;
      message.msg = this.appsession.getTranslated("DemoFunctionalityLimited");
      this.appsession.setGlobalHeaderMessage(message);
      return;
    }

    this.infoMsg.clear();
    if (form.valid) {

      if (!this.isDeactivateConfirm) {
        this.infoMsg.add(this.appsession.getTranslated("ConfirmDeactivationRequired"));
        return;
      }
      this.isSubmitted = true;

      this.user.id = this.appsession.CurrentUser.userVM.id;

      this.userSource.deactivateAccount(this.user).subscribe(
        data => {
          this.isSubmitted = false;
          form.reset();
          this.appsession.logOut();
          let message: MessageDetail = new MessageDetail();
          message.isInfo = true
          message.msg = this.appsession.getTranslated("AccountDeactivated");
          this.appsession.setGlobalHeaderMessage(message);
          return;
        },
        error => {
          this.isSubmitted = false;
          let messages = this.appsession.getHttpErrorMessages(error);
          this.infoMsg.addRange(messages);
          return;
        }
      )
    }
  }

  ngOnInit() {
  }

}
