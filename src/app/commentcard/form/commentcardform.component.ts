import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AppsessionService } from '../../service/appsession.service';
import { UserSession } from '../../model/usersession.model';
import { PropertyInformation } from '../../property/model/property.model';
import { CommentCardMod } from '../model/commentcard.model';
import { PsMaxLengths, UserTypeEnum } from '../../common/AppConstants';
import { ErrorMessage } from '../../model/utility.model';
import { CommentCardService } from '../service/commentcard.service';
import {ResidentsService } from '../../property/tenant/service/residents.service';

@Component({
  selector: 'app-commentcardform',
  templateUrl: './commentcardform.component.html'
})
export class CommentcardformComponent implements OnInit {
  commentForm: CommentCardMod = new CommentCardMod();
  selectedProperty: PropertyInformation;
  currentUser: UserSession;
  siteConstant: PsMaxLengths = new PsMaxLengths();
  showForm: boolean = false;
  canSeeCommentForm: boolean = false;
  commentInfoMsg: ErrorMessage = new ErrorMessage();
  isSubmitted: boolean = false;
  constructor(private appsession: AppsessionService, private commentSource: CommentCardService, private residentService: ResidentsService) { }

  ngOnInit() {
    if (this.appsession.IsUserLoggedIn) {

      this.currentUser = this.appsession.CurrentUser;
      if (this.appsession.selectedProperty != null) {

        this.selectedProperty = this.appsession.selectedProperty;

      }

      if (this.currentUser.userTypeEnum == UserTypeEnum[UserTypeEnum.Tenant]) {

        if (this.selectedProperty != null) {
          this.residentService.hasValidResidency(this.currentUser.userVM.id, this.selectedProperty.id).subscribe(data => this.canSeeCommentForm = data);
        }
      }

    }
  }

  onCommentSubmit(form: NgForm) {

    this.commentInfoMsg.clear();
    if (form.valid) {
      this.isSubmitted = true;
      this.commentForm.userId = this.currentUser.userVM.id;
      this.commentForm.propertyInformationId = this.selectedProperty.id;
      this.commentSource.saveCommentCard(this.commentForm).subscribe(
        data => {
          this.isSubmitted = false;
          this.appsession.setGlobalHeaderMessage();
          form.reset();
          this.commentSource.loadCommentCards(this.currentUser.userVM.id, this.selectedProperty.id);
          this.showformClicked(false);
          return;
        },
        error => {
          this.isSubmitted = false;
          let messages = this.appsession.getHttpErrorMessages(error);
          this.commentInfoMsg.addRange(messages);
          return;
        }

      )
    }
  }

  showformClicked(value: boolean) {
    this.commentInfoMsg.clear();
    if (!value) {
      this.commentForm = new CommentCardMod();
    }
    this.showForm = value
  }

}
