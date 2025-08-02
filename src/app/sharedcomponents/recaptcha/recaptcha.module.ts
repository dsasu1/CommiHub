import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecaptchaComponent } from './recaptcha.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [RecaptchaComponent],
  exports: [RecaptchaComponent]
})
export class RecaptchaModule { }
