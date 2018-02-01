import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../service/review.service';
import { AppsessionService } from '../../service/appsession.service';
import { PropertyInformation } from '../../property/model/property.model';
import { AppConstants, UserTypeEnum } from '../../common/AppConstants';
import { ErrorMessage } from '../../model/utility.model';
import { UserSession } from '../../model/usersession.model';
import { NgForm } from '@angular/forms';
import { ReviewMod } from '../model/review.model';
import { ResidentsService } from '../../property/tenant/service/residents.service';

@Component({
  selector: 'app-reviews-form',
  templateUrl: './reviews-form.component.html',
  styles: []
})
export class ReviewsFormComponent implements OnInit {
  reviews: ReviewMod[];
  selectedProperty: PropertyInformation;
  siteConstant: AppConstants = AppConstants;
  currentUser: UserSession;
  revForm: ReviewMod = new ReviewMod();
  showForm: boolean = false;
  InfoMsg: ErrorMessage = new ErrorMessage();
  isSubmitted: boolean = false;
  canSeeReviewForm: boolean = false;
  constructor(private appsession: AppsessionService, private reviewSource: ReviewService, private residentService: ResidentsService) { }

  ngOnInit() {
    if (this.appsession.IsUserLoggedIn) {
      this.currentUser = this.appsession.CurrentUser;
      if (this.appsession.selectedProperty != null) {

        this.selectedProperty = this.appsession.selectedProperty;
      }

      if (this.currentUser.userTypeEnum == UserTypeEnum[UserTypeEnum.Tenant]) {

        if (this.selectedProperty != null) {

          this.residentService.hasValidOrPreviousResidency(this.currentUser.userVM.id, this.selectedProperty.id).subscribe(data => this.canSeeReviewForm = data);

        }
      }
   

    }

  }


  onReviewSubmit(form: NgForm) {
    this.InfoMsg.clear();

    if (form.valid) {
      this.isSubmitted = true;
      this.revForm.userId = this.currentUser.userVM.id;
      this.revForm.propertyInformationId = this.selectedProperty.id;
      this.reviewSource.saveReview(this.revForm).subscribe(
        data => {
          this.isSubmitted = false;
          this.appsession.setGlobalHeaderMessage();
          this.reviewSource.loadReviews(this.selectedProperty.id);
          this.showformClicked(false);
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

  showformClicked(value: boolean) {
    this.InfoMsg.clear();
    if (!value) {
      this.revForm = new ReviewMod();
    }
    this.showForm = value
  }

}
