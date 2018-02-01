import { Component, OnInit , Input, EventEmitter, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ErrorMessage, MessageDetail } from '../../model/utility.model';
import { FileOptions } from './model/fileupload.model';
import { FileUploadService } from './service/fileupload.service';
import { AppsessionService } from '../../service/appsession.service';
import { PropertyInformation } from '../../property/model/property.model';
import { PSUploadType } from '../../common/AppConstants';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styles: []
})
export class UploadFormComponent implements OnInit {
  @Input() uploadOptions: FileOptions;
  @Output() onFinishedUpload: EventEmitter<any> = new EventEmitter<any>();
  InfoMsg: ErrorMessage = new ErrorMessage();
  fileInput: any;
  filesToUpload: any[] = [];
  isSubmitted: boolean = false;
  constructor(private fileService: FileUploadService, private appSession: AppsessionService ) { }

  ngOnInit() {
  }

  onFileChange(event) {
    let files = event.target.files;
    this.filesToUpload = Object.assign([],files);
  }

  onUpload(form: NgForm) {
    //if (this.uploadOptions.uploadType == PSUploadType[PSUploadType.CoverImage] || this.uploadOptions.uploadType == PSUploadType[PSUploadType.ProfilePic]) {
    //  let item = this.uploadOptions.uploadTarget;

    //  if (item != null && item.isDemoAccount) {
    //    let message: MessageDetail = new MessageDetail();
    //    message.isInfo = true;
    //    message.msg = this.appSession.getTranslated("DemoFunctionalityLimited");
    //    this.appSession.setGlobalHeaderMessage(message);
    //    return;
    //  }
    //}

    if (form.valid) {

      if (this.filesToUpload.length > 0) {
        if (this.filesToUpload.length > 0 && (!this.isValidFiles(this.filesToUpload))) {
          return;
        }
        let formData: FormData = new FormData();
        for (var j = 0; j < this.filesToUpload.length; j++) {
          formData.append("files", this.filesToUpload[j]);
        }

        formData.append("uploadType", this.uploadOptions.uploadType);
        formData.append("userId", this.uploadOptions.userId);
        if (this.uploadOptions.propertyInformationId != null) {
          formData.append("propertyInformationId", this.uploadOptions.propertyInformationId);
        }
        formData.append("fileType", this.uploadOptions.fileType);
        formData.append("directoryId", this.uploadOptions.directoryId);
        formData.append("hasThumbnail", this.uploadOptions.hasThumbnail? "true" : "false");
        formData.append("thumbnailWidth", this.uploadOptions.thumbnailWidth.toString());
        formData.append("thumbnaiHeight", this.uploadOptions.thumbnaiHeight.toString());
        formData.append("containerName", this.uploadOptions.containerName);
        this.isSubmitted = true;
        this.fileService.uploadFile(formData).subscribe(data => {
          this.appSession.setGlobalHeaderMessage();
          this.onFinishedUpload.emit(data);
          this.isSubmitted = false;
          this.fileInput = null;
          form.reset();
          this.filesToUpload = [];
          return;
        },
          error => {
            let messages = this.appSession.getHttpErrorMessages(error);
            this.isSubmitted = false;
            this.InfoMsg.addRange(messages);
            return;
          }
        );

      } 
    }
  
  }

  clearForm(form: NgForm) {
    form.reset();
    this.filesToUpload = [];
  }

  private isValidFiles(files) {
    // Check Number of files
    if (files.length > this.uploadOptions.maxFiles) {
      this.InfoMsg.add("Error: At a time you can upload only  files");
      return;
    }
    this.isValidFileExtension(files);
    return this.InfoMsg.errorMessages.length === 0;
  }

  private isValidFileExtension(files) {
    // Make array of file extensions
    var extensions = (this.uploadOptions.fileExt.split(','))
      .map(function (x) { return x.toLocaleUpperCase().trim() });
    for (var i = 0; i < files.length; i++) {
      // Get file extension
      var ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
      // Check the extension exists
      var exists = extensions.includes(ext);
      if (!exists) {
        this.InfoMsg.add("Error (Extension): " + files[i].name);
      }
      // Check file size
      this.isValidFileSize(files[0]);
    }
  }

  private isValidFileSize(file) {
    var fileSizeinMB = file.size / (1024 * 1000);
    var size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
    if (size > this.uploadOptions.maxSize)
      this.InfoMsg.add("Error (File Size): " + file.name + ": exceed file size limit of " + "MB ( " + size + "MB )");
  }
}
