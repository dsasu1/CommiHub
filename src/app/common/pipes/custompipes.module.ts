import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressFormatPipe } from './AddressFormatPipe';
import { PSDateFormat } from './PSDateFormat';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AddressFormatPipe, PSDateFormat],
  exports: [AddressFormatPipe, PSDateFormat]
})
export class CustompipesModule { }
