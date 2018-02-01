import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReviewMod } from '../model/review.model';
import { ReviewService } from '../service/review.service';
import { AppsessionService } from '../../service/appsession.service';

@Component({
  selector: 'app-reviewlist',
  templateUrl: './reviewlist.component.html'
})
export class ReviewlistComponent implements OnInit, OnDestroy {
  availableReviews: ReviewMod[];
  currentReviews: ReviewMod[] = new Array<ReviewMod>();
  private subscription: any;
  constructor(private appsession: AppsessionService, private reviewSource: ReviewService) { }

  trackingBy(index: number, data: ReviewMod): string { return data.id; }

  ngOnInit() {
    this.subscription = this.reviewSource.reviewListChange.subscribe(value => {
      this.availableReviews = value;

      if (this.availableReviews != null) {
        this.currentReviews = this.appsession.paginate(this.availableReviews, this.appsession.defaultPageSize, this.appsession.defaultPageSize);
      }
    });

      if (this.appsession.selectedProperty != null) {

        this.reviewSource.loadReviews(this.appsession.selectedProperty.id);
      }

    
  }

  onHelpfulClick(index: number) {
    let review = this.currentReviews[index];
    review.helpful++;
    this.currentReviews[index] = review;
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
