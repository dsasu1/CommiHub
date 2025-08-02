import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppmessagesModule } from '../../sharedcomponents/appmessages/appmessages.module';
import { ProgressbarModule } from '../../sharedcomponents/progressbar/progressbar.module';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';


import { BasicpropertyformComponent } from '../form/basicpropertyform.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AppmessagesModule,
    ToggleButtonModule,
    InputMaskModule,
    ProgressbarModule,
    InputTextModule,
    EditorModule,
    FormsModule
  ],
  declarations: [BasicpropertyformComponent],
  exports: [BasicpropertyformComponent]
})
export class SharedbasicformModule { }
