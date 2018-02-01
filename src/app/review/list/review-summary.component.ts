import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReviewMod } from '../model/review.model';
import { ReviewService } from '../service/review.service';
import { AppsessionService } from '../../service/appsession.service';

@Component({
  selector: 'app-review-summary',
  templateUrl: './review-summary.component.html',
  styles: []
})
export class ReviewSummaryComponent implements OnInit, OnDestroy {
  availableReviews: ReviewMod[] = new Array<ReviewMod>();
  overallRatingAvg: number = 0;
  staffRatingAvg: number = 0;
 maintenanceRatingAvg: number = 0;
  safetyRatingAvg: number = 0;
  neighborRatingAvg: number = 0;
  groundsRatingAvg: number = 0;
  noiseRatingAvg: number = 0;
  total: number = 0
  private subscription: any;
  constructor(private appsession: AppsessionService, private reviewSource: ReviewService) { }

  ngOnInit() {
    this.subscription = this.reviewSource.reviewListChange.subscribe(value => {
      this.availableReviews = value;

      if (this.availableReviews != null && this.availableReviews.length > 0) {
        this.total = this.availableReviews.length;
        this.overallRatingAvg = this.availableReviews.map(item => item.overallRating).reduce((prev, next) => prev + next) / this.total;
        this.staffRatingAvg = this.availableReviews.map(item => item.staffRating).reduce((prev, next) => prev + next) / this.total;
        this.maintenanceRatingAvg = this.availableReviews.map(item => item.maintenanceRating).reduce((prev, next) => prev + next) / this.total;
        this.safetyRatingAvg = this.availableReviews.map(item => item.safetyRating).reduce((prev, next) => prev + next) / this.total;
        this.neighborRatingAvg = this.availableReviews.map(item => item.neighborRating).reduce((prev, next) => prev + next) / this.total;
        this.groundsRatingAvg = this.availableReviews.map(item => item.groundsRating).reduce((prev, next) => prev + next) / this.total;
        this.noiseRatingAvg = this.availableReviews.map(item => item.noiseRating).reduce((prev, next) => prev + next) / this.total;
 
      }
     
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
