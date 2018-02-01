import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppmessagesModule } from '../appmessages/appmessages.module';
import { UploadFormComponent } from './upload-form.component';
import { FileUploadService } from './service/fileupload.service';
import { ProgressbarModule } from '../progressbar/progressbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    AppmessagesModule,
    ProgressbarModule
  ],
  declarations: [UploadFormComponent],
  exports: [UploadFormComponent],
  providers: [FileUploadService]
})
export class FileuploaderModule { }
