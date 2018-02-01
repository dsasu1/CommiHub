import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecaptchaComponent } from './recaptcha.component';
import { CaptchaModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CaptchaModule
  ],
  declarations: [RecaptchaComponent],
  exports: [RecaptchaComponent]
})
export class RecaptchaModule { }
