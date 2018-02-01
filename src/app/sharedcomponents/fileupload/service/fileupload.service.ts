import { Injectable, OnInit } from '@angular/core';
import { AbstractRestService } from '../../../service/BaseService';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class FileUploadService extends AbstractRestService {
  private controller: string = "files/";

  constructor(http: HttpClient) {
    super(http);

  }

  uploadFile(option: any) {
    return this.postItem<any>(this.controller + 'FileUpload', option)
  }
}
