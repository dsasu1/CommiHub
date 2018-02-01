import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressbarComponent } from './progressbar.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [

    CommonModule,
    TranslateModule
  ],
  declarations: [ProgressbarComponent],
  exports: [ProgressbarComponent]
})
export class ProgressbarModule { }
