import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HoursoperationComponent } from '../form/hoursoperation.component';
import { AppmessagesModule } from '../../sharedcomponents/appmessages/appmessages.module';
import { ProgressbarModule } from '../../sharedcomponents/progressbar/progressbar.module';
import {
  ToggleButtonModule, InputMaskModule
} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    ProgressbarModule,
    ToggleButtonModule,
    InputMaskModule,
    FormsModule,
    AppmessagesModule,
    TranslateModule
  ],
  declarations: [HoursoperationComponent],
  exports: [HoursoperationComponent]
})
export class SharedhourModule { }
