import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrormessageComponent } from './errormessage.component';
import {
  MessagesModule, GrowlModule
} from 'primeng/primeng';


@NgModule({
  imports: [
    CommonModule,
    MessagesModule,
    GrowlModule
  ],
  declarations: [ErrormessageComponent],
  exports: [ErrormessageComponent]
})
export class AppmessagesModule { }
