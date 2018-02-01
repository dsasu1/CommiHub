import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../service/BaseService';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommentCardMod } from '../model/commentcard.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommentCardService extends AbstractRestService {
  private controller: string = "CommentCards/";
  commListChange: Subject<CommentCardMod[]> = new Subject<CommentCardMod[]>();

  constructor(http: HttpClient) {
    super(http)

  }
  saveCommentCard(commCard: CommentCardMod) {
    return this.postItem<CommentCardMod>(this.controller + "SaveCommendCard", commCard);
  }

  getCommentCards(userId: string, propertyId: string) {
    let httpParams: HttpParams = new HttpParams().append("userId", userId).append("propertyId", propertyId);
    return this.getItem<CommentCardMod[]>(this.controller + "GetCommendCards", httpParams)
  }

  loadCommentCards(userId: string, propertyId: string) {
    this.getCommentCards(userId, propertyId).subscribe(data => {
      this.commListChange.next(data);

    });
  }
}
