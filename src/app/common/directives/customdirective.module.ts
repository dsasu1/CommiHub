import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PSSweetAlertDirective } from './sweetalert.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PSSweetAlertDirective],
  exports: [PSSweetAlertDirective]
})
export class CustomdirectiveModule { }
