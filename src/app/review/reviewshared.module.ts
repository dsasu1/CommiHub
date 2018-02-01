import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewlistComponent } from './list/reviewlist.component';
import { ReviewSummaryComponent } from './list/review-summary.component';
import {
  InputTextModule,
  ToggleButtonModule, RatingModule
} from 'primeng/primeng';

import { ApppagerModule } from '../sharedcomponents/paging/apppager.module';
import { TranslateModule } from '@ngx-translate/core';

import { CustompipesModule } from '../common/pipes/custompipes.module';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    CustompipesModule,
    ToggleButtonModule, RatingModule,
    ApppagerModule, TranslateModule
  ],
  declarations: [ReviewlistComponent, ReviewSummaryComponent],
  exports: [ReviewlistComponent, InputTextModule, ReviewSummaryComponent,
    ToggleButtonModule, RatingModule, TranslateModule, FormsModule]
})
export class ReviewsharedModule { }
