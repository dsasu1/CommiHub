import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { AppConstants, UserTypeEnum, ChangeType, PSUploadType } from '../../common/AppConstants';
import { UsersService, GlobalService } from '../../service/model.service';
import { UserType, User } from '../../model/users.model';
import { UserSession } from '../../model/usersession.model';
import { Language } from '../../model/global.model';
import { ErrorMessage, MessageDetail } from '../../model/utility.model';
import { FileOptions } from '../../sharedcomponents/fileupload/model/fileupload.model';

import { AppsessionService } from '../../service/appsession.service';

@Component({
  selector: 'app-personalinfo',
  templateUrl: './personalinfo.component.html'
})
export class PersonalinfoComponent implements OnInit {
   upOtions: FileOptions = new FileOptions();
    personalInfoMsg: ErrorMessage = new ErrorMessage();
    siteConstant: AppConstants = AppConstants;
    currentUser: UserSession;
    user: User;
    isHideLastName: boolean = false;
    firstNameLabel: string = "FirstName";
    firstNameEnterLabel: string = "EnterFirstName";
    isSubmitted: boolean = false;
    constructor(private userSource: UsersService, private appsession: AppsessionService, private globalSource: GlobalService) { }

    ngOnInit() {

      if (this.appsession.IsUserLoggedIn) {
        
        this.currentUser = this.appsession.getCurrentUser();
        this.user = Object.assign({},this.currentUser.userVM);
        let management: string = UserTypeEnum[UserTypeEnum.ManagementCompany];
        this.isHideLastName = this.currentUser.userTypeEnum == management;
        this.firstNameLabel = this.isHideLastName ? "Name" : "FirstName"
        this.firstNameEnterLabel = this.isHideLastName ? "EnterName" : "EnterFirstName"
        this.setUploadOptions();
      }
       
    }

    getLanguages(): Language[] {
      return this.globalSource.getavailableLanguages();
    }


    onSubmitSaveBasic(form: NgForm)
    {
      if (this.currentUser.userVM.isDemoAccount) {
        let message: MessageDetail = new MessageDetail();
        message.isInfo = true;
        message.msg = this.appsession.getTranslated("DemoFunctionalityLimited");
        this.appsession.setGlobalHeaderMessage(message);
        return;
      }

        this.personalInfoMsg.clear();
        if (form.valid) {
          this.isSubmitted = true;
            this.user.changeType = ChangeType[ChangeType.PersonalInfo];
            this.userSource.SaveUserInfo(this.user).subscribe(
              data => {
                this.isSubmitted = false;
                this.appsession.setGlobalHeaderMessage();
                    this.user.changeType = null;
                    this.currentUser.userVM = this.user;
                    this.appsession.updateCurrentUserSession(this.currentUser);
                    if (this.user.lang != null) {
                        this.appsession.setTranslateLang(this.user.lang);
                    }
                    return;
                },
                error => {
                  this.isSubmitted = false;
                    let messages = this.appsession.getHttpErrorMessages(error);
                    this.personalInfoMsg.addRange(messages);
                    return;
                }
            )

        }
    }

    onCancel() {
        this.user = this.appsession.getCurrentUser().userVM;
        this.currentUser.userVM = this.user;
        this.appsession.updateCurrentUserSession(this.currentUser);
    }

    onUploadFinished(event: User) {

      this.user.photoOriginal = event.photoOriginal;
      this.user.photoThumbnail = event.photoThumbnail;
      this.currentUser.userVM = this.user;
      this.appsession.updateCurrentUserSession(this.currentUser);
    }

    GetImageUrl() {
      let result = this.appsession.getImageData(this.user.photoThumbnail, 'image', '../../../assets/img/avatar1.jpg');
      return result;

    }

    private setUploadOptions() {
        this.upOtions.uploadTarget = this.user;
        this.upOtions.name = PSUploadType[PSUploadType.ProfilePic];
        this.upOtions.uploadType = PSUploadType[PSUploadType.ProfilePic];
        this.upOtions.hasThumbnail = false;
        this.upOtions.thumbnailWidth = 96;
        this.upOtions.thumbnaiHeight = 96;
        this.upOtions.directoryId = this.appsession.CurrentUser.userVM.id;
        this.upOtions.userId = this.appsession.CurrentUser.userVM.id;
      
    }
}
