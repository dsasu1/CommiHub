import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { AppmessagesModule } from '../sharedcomponents/appmessages/appmessages.module';

import { UserAuthenticationGuard } from '../service/UserAuthenticationGuard';

import { ReviewsComponent } from './reviews.component';
import { ReviewGuard } from './guards/review.guard';
import { ReviewsFormComponent} from './form/reviews-form.component';
import { ProgressbarModule } from '../sharedcomponents/progressbar/progressbar.module';
import { SelectedPropertyResolver } from '../property/service/propertInfo.resolver';

import { ReviewsharedModule } from './reviewshared.module';



const routes: Routes = [

  { path: '', component: ReviewsComponent, canActivate: [UserAuthenticationGuard], resolve: { propertyInfo: SelectedPropertyResolver }}
]


@NgModule({
  imports: [
    CommonModule,
    AppmessagesModule,
    ProgressbarModule,
    ReviewsharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReviewsComponent, ReviewsFormComponent],
  providers: [ReviewGuard],
  exports: [RouterModule]

})
export class ReviewModule { }
