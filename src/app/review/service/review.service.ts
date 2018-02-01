import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../service/BaseService';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ReviewMod } from '../model/review.model';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ReviewService extends AbstractRestService {
  private controller: string = "Reviews/";
  reviewListChange: Subject<ReviewMod[]> = new Subject<ReviewMod[]>();

  constructor(http: HttpClient) {
    super(http)

  }
  saveReview(review: ReviewMod) {
    return this.postItem<ReviewMod>(this.controller + "SaveReview", review);
  }

  getReviews(propertyId: string) {
    let httpParams: HttpParams = new HttpParams().append("propertyId", propertyId);
    return this.getItem<ReviewMod[]>(this.controller + "GetReviews", httpParams)
  }

  loadReviews(propertyId: string) {
    this.getReviews(propertyId).subscribe(data => {
      this.reviewListChange.next(data);

    });
  }
}
