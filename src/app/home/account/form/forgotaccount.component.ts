import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { AppsessionService } from '../../../service/appsession.service';
import { UsersService } from '../../../service/model.service'
import { User } from '../../../model/users.model'
import { AppConstants,PsMaxLengths } from '../../../common/AppConstants';
import { ErrorMessage } from '../../../model/utility.model';



@Component({
  selector: 'app-forgotaccount',
  templateUrl: './forgotaccount.component.html'
})
export class ForgotaccountComponent implements OnInit {
    forgotAccountMsg: ErrorMessage = new ErrorMessage();
    siteConstant: PsMaxLengths = new PsMaxLengths();
    isrequiresSecurity: boolean = false;
    titleKey: string = "FindAccount";
    findAccountUser: User = new User();
    isSubmitted: boolean = false;
    constructor(private appsession: AppsessionService, private userSource: UsersService) { }

  ngOnInit() {

      this.appsession.SetAppTitle(this.titleKey);
  }

  onSubmitFind(form: NgForm) {
      this.forgotAccountMsg.clear();
      if (form.valid) {
        this.isSubmitted = true;
          this.userSource.retrieveAccount(this.findAccountUser).subscribe(
            data => {
              this.isSubmitted = false;
                  if (data.securityQuestion != null) {
                      this.findAccountUser = data;
                      this.isrequiresSecurity = true;
                  }
                  else {

                    this.forgotAccountMsg.isSuccessMessage();
                      this.forgotAccountMsg.add(this.appsession.getTranslated(AppConstants.CheckEmailForStep));
                      form.reset();
                  }
               
                  return;
              },
            error => {
              this.isSubmitted = false;
                  let messages = this.appsession.getHttpErrorMessages(error);
                  this.forgotAccountMsg.addRange(messages);
                  return;
              }
          );

      }

  }

  onSubmitSecurity(form: NgForm) {
      this.forgotAccountMsg.clear();
      if (form.valid) {
        this.isSubmitted = true;
          this.userSource.verifySecurityAnswer(this.findAccountUser).subscribe(
              data => {
                this.isSubmitted = false;
                this.forgotAccountMsg.isSuccessMessage();
                  this.forgotAccountMsg.add(this.appsession.getTranslated(AppConstants.CheckEmailForStep));
                  this.isrequiresSecurity = false;
                  this.findAccountUser = new User();
                  form.reset();
                  
                  return;
              },
              error => {
                this.isSubmitted = false;
                  let messages = this.appsession.getHttpErrorMessages(error);
                  this.forgotAccountMsg.addRange(messages);
                  return;
              }
          );

      }

  }
}
