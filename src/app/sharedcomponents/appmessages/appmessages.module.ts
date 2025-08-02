import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ErrormessageComponent } from './errormessage.component';


@NgModule({
  imports: [
    CommonModule,
    MessagesModule,
    ToastModule
  ],
  declarations: [ErrormessageComponent],
  exports: [ErrormessageComponent]
})
export class AppmessagesModule { }
