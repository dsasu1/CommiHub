import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { AppConstants, PsMaxLengths, UserTypeEnum } from '../../../common/AppConstants';
import { User, UserType } from '../../../model/users.model';
import { ErrorMessage, MessageDetail } from '../../../model/utility.model';
import { AppsessionService } from '../../../service/appsession.service';
import { UsersService } from '../../../service/model.service';

import { RecaptchaResponse } from '../../../sharedcomponents/recaptcha/model/recaptcha.model';


@Component({
  selector: 'app-registerloginform',
  templateUrl: './registerloginform.component.html',
  styleUrls: ['./registerloginform.component.css']
})
export class RegisterloginformComponent implements OnInit {
  loginRegisterMsg: ErrorMessage = new ErrorMessage();
  returnUrl: string;
  siteConstant: PsMaxLengths = new PsMaxLengths();
  registerUser: User = new User();
  loginUser: User = new User();
  isHideLastName: boolean = false;
  firstNameLabel: string = "FirstName";
  firstNameEnterLabel: string = "EnterFirstName";
  isSubmitted: boolean = false;
  usertypes: UserType[] = new Array<UserType>();
  repCaptchaResponse: RecaptchaResponse = new RecaptchaResponse();

  constructor(private actroute: ActivatedRoute, private userSource: UsersService, private appsession: AppsessionService) {

  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.actroute.queryParams['returnUrl'] || '/newsfeed';

    let userEmail = this.appsession.getUserRememberMe();

    if (userEmail != null) {
      this.loginUser.email = userEmail;
    }

    this.userSource.getUserTypes().subscribe(data => this.usertypes = data);
  }

  loginClicked: boolean = true;

  // Password visibility toggles
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  hideLoginPassword: boolean = true;


  tabClicked(isLogin: boolean) {
    this.isSubmitted = false;
    this.loginClicked = isLogin;
    this.loginRegisterMsg.clear();
  }

  onTabChange(event: any) {
    this.isSubmitted = false;
    this.loginClicked = event.index === 1;
    this.loginRegisterMsg.clear();
  }

  onSubmitLogin(form: NgForm) {

    this.loginRegisterMsg.clear();
    if (form.valid) {
      this.isSubmitted = true;
      this.userSource.loginUser(this.loginUser).subscribe(
        data => {
          this.isSubmitted = false;
          if (data != null) {

            if (data.userVM.isDemoAccount) {
              let messageDetail = new MessageDetail();
              messageDetail.lifeSpanInMilli = 6000;
              messageDetail.isInfo = true;
              messageDetail.msg = this.appsession.getTranslated("DemoAccountLoginMessage");
              this.appsession.setGlobalHeaderMessage(messageDetail);
            }

            this.appsession.logIn(data, this.loginUser.rememberMe);
            this.appsession.redirectToRoute(this.returnUrl);

            return;

          }

        },
        error => {
          this.isSubmitted = false;
          let messages = this.appsession.getHttpErrorMessages(error);
          this.loginRegisterMsg.addRange(messages);
          return;
        }
      );

    }

  }

  onSubmitRegister(form: NgForm) {

    this.loginRegisterMsg.clear();
    if (this.registerUser.password !== this.registerUser.confirmPassword) {

      this.loginRegisterMsg.add(this.appsession.getTranslated(AppConstants.ConfirmPasswordMatchError));
      return;
    }
    //else if (!this.repCaptchaResponse.success) {
    //    this.loginRegisterMsg.add(this.appsession.getTranslated(AppConstants.RobotVerify));
    //    return;
    //  }
    else if (!this.registerUser.isAcceptedTerms) {
      this.loginRegisterMsg.add(this.appsession.getTranslated(AppConstants.AcceptTermsError));
      return;
    }

    if (form.valid) {
      this.isSubmitted = true;

      this.userSource.registerUser(this.registerUser).subscribe(
        data => {
          this.isSubmitted = false;
          this.appsession.JustRegistered = true;
          this.appsession.TempUser = this.registerUser;
          this.appsession.redirectToRoute("/registersuccess");
          return;
        },
        error => {
          this.isSubmitted = false;
          let messages = this.appsession.getHttpErrorMessages(error);
          this.loginRegisterMsg.addRange(messages);
          return;
        }
      );

    }

  }


  onUserTypeChange(event: Event): void {

    let management: string = UserTypeEnum[UserTypeEnum.ManagementCompany];
    this.isHideLastName = this.registerUser.userTypeEnum == management;

    this.firstNameLabel = this.isHideLastName ? "Name" : "FirstName"
    this.firstNameEnterLabel = this.isHideLastName ? "EnterName" : "EnterFirstName"
  }

  onRecaptchaClicked(event: RecaptchaResponse) {
    this.repCaptchaResponse = event;
  }


}
