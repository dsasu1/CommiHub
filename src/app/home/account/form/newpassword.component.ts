import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { User } from '../../../model/users.model';
import { UsersService } from '../../../service/model.service';
import { AppConstants ,PsMaxLengths} from '../../../common/AppConstants';
import { AppsessionService } from '../../../service/appsession.service';
import { ErrorMessage } from '../../../model/utility.model';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html'
})
export class NewpasswordComponent implements OnInit {
    isDoneLoading = false;
    titleKey: string = "NewPassword";
    newPassAccountMsg: ErrorMessage = new ErrorMessage();
    newPasswordUser: User = new User();
    siteConstant: PsMaxLengths = new PsMaxLengths();
    isSubmitted: boolean = false;
    constructor(private userSource: UsersService,  private appsession: AppsessionService, private activeRoute: ActivatedRoute) { }

    ngOnInit() {

        let code = this.activeRoute.snapshot.params["id"];
        if (code == null) {
          this.appsession.redirectToRoute();
            return;
        }

        this.newPasswordUser.vericationCodeId = code
        this.userSource.verifyChangePassword(this.newPasswordUser).subscribe(
            data => {

                this.newPasswordUser = data;
                this.isDoneLoading = true;
                return;
            },
            error => {

              this.appsession.redirectToRoute();
                return;
            }
        );

        this.appsession.SetAppTitle(this.titleKey);
     }

  onSubmitPassword(form: NgForm)
  {
      this.newPassAccountMsg.clear();
      if (form.valid) {

          if (this.newPasswordUser.password !== this.newPasswordUser.confirmPassword) {

              this.newPassAccountMsg.add(this.appsession.getTranslated(AppConstants.ConfirmPasswordMatchError));
              return;
          }
          this.isSubmitted = true;
          this.userSource.saveNewPassword(this.newPasswordUser).subscribe(
              data => {
                this.isSubmitted = false;
                this.appsession.setGlobalHeaderMessage();
                form.reset();
                this.appsession.redirectToRoute();
                  return;
              },
              error => {
                this.isSubmitted = false;
                  let messages = this.appsession.getHttpErrorMessages(error);
                  this.newPassAccountMsg.addRange(messages)
                  return;
              }
          );
      }
  }
}
