import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../service/appsession.service';



@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {
  titleKey: string = "Reviews";

  constructor(private appsession: AppsessionService) { }

  ngOnInit() {
    this.appsession.SetAppTitle(this.titleKey);

  }



}
