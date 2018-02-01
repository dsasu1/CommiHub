import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../../service/appsession.service';
import { UserSession } from '../../model/usersession.model';
import { PropertyInformation } from '../../property/model/property.model';
import { NgForm } from '@angular/forms';
import { NewsPostMod } from '../model/news.model';
import { ErrorMessage } from '../../model/utility.model';
import { AppConstants, UserTypeEnum, ShareWithEnum } from '../../common/AppConstants';
import { NewsService } from '../service/news.service';
import { ResidentsService } from '../../property/tenant/service/residents.service';
@Component({
  selector: 'app-newsfeedform',
  templateUrl: './newsfeedform.component.html'
})
export class NewsfeedformComponent implements OnInit {
  selectedProperty: PropertyInformation;
  currentUser: UserSession;
  newsForm: NewsPostMod = new NewsPostMod();
  siteConstant: AppConstants = AppConstants;
  InfoMsg: ErrorMessage = new ErrorMessage();
  isSubmitted: boolean = false;
  canSeeNewsForm: boolean = false;
  constructor(private appsession: AppsessionService, private newsSource: NewsService, private residentService: ResidentsService) {
  }

  ngOnInit() {

    if (this.appsession.IsUserLoggedIn) {
      this.currentUser = this.appsession.CurrentUser;
      if (this.appsession.selectedProperty != null) {

        this.selectedProperty = this.appsession.selectedProperty;
      }
  
      if (this.currentUser.userTypeEnum == UserTypeEnum[UserTypeEnum.Tenant]) {

        if (this.selectedProperty != null) {

          this.residentService.hasValidResidency(this.currentUser.userVM.id, this.selectedProperty.id).subscribe(data => this.canSeeNewsForm = data);

        }
      }
      else {
        this.canSeeNewsForm = this.selectedProperty != null;
      }
    }
  }


  onNewsSubmit(form: NgForm) {
    this.InfoMsg.clear();
    if (form.valid) {
      this.isSubmitted = true;
      this.newsForm.userId = this.currentUser.userVM.id;
      this.newsForm.propertyInformationId = this.selectedProperty.id;
      this.newsForm.shareWithEnum = ShareWithEnum[ShareWithEnum.Property];
      this.newsSource.saveNewsPost(this.newsForm).subscribe(
        data => {
          this.isSubmitted = false;
          this.appsession.setGlobalHeaderMessage();
          form.reset();
          this.newsSource.loadNewsPosts(this.currentUser.userVM.id, this.selectedProperty.id);
          return;
        },
        error => {
          this.isSubmitted = false;
          let messages = this.appsession.getHttpErrorMessages(error);
          this.InfoMsg.addRange(messages);
          return;
        }

      )

    }
  }

}
