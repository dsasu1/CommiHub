import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommentCardMod } from '../model/commentcard.model';
import { CommentCardService } from '../service/commentcard.service';
import { AppsessionService } from '../../service/appsession.service';

@Component({
  selector: 'app-commentcardlists',
  templateUrl: './commentcardlists.component.html'
})
export class CommentcardlistsComponent implements OnInit, OnDestroy{
  availableCommentCards: CommentCardMod[];
  currentCards: CommentCardMod[] = new Array<CommentCardMod>();
  private subscription: any;
  constructor(private appsession: AppsessionService, private commentSource: CommentCardService) { }

  trackingBy(index: number, data: CommentCardMod): string { return data.id; }

  ngOnInit() {
    this.subscription = this.commentSource.commListChange.subscribe(value => {
      this.availableCommentCards = value;

      if (this.availableCommentCards != null) {
        this.currentCards = this.appsession.paginate(this.availableCommentCards, this.appsession.defaultPageSize, this.appsession.defaultPageSize);
      }
    });
    if (this.appsession.IsUserLoggedIn) {

      if (this.appsession.selectedProperty != null) {

        this.commentSource.loadCommentCards(this.appsession.CurrentUser.userVM.id, this.appsession.selectedProperty.id);
      }

    }
   
   
  }

  ngOnDestroy(){

    this.subscription.unsubscribe();
  }

}
