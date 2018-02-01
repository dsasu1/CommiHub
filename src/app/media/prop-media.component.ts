import { Component, OnInit } from '@angular/core';
import { FileOptions } from '../sharedcomponents/fileupload/model/fileupload.model';
import { PropertyInformation} from '../property/model/property.model';
import { AppsessionService } from '../service/appsession.service';
import { PropertyService } from '../property/service/property.service';
import { PSUploadType } from '../common/AppConstants';

@Component({
  selector: 'app-prop-media',
  templateUrl: './prop-media.component.html'
})
export class PropMediaComponent implements OnInit {
  currentTab: string = "CoverImage";
  upOtions: FileOptions = new FileOptions();
  editProperty: PropertyInformation;
  constructor(private appSession: AppsessionService, private propertySource: PropertyService) { }

  ngOnInit() {
    if (this.appSession.IsUserLoggedIn) {
      if (this.appSession.editItem != null) {

        this.editProperty = <PropertyInformation>this.appSession.editItem;
        this.upOtions.propertyInformationId = this.editProperty.id;
        this.upOtions.uploadTarget = this.editProperty;
        this.upOtions.directoryId = this.editProperty.id;       
      }


      this.setUploadOptions(this.currentTab);
      this.upOtions.uploadType = this.currentTab;
      this.upOtions.userId = this.appSession.CurrentUser.userVM.id;

    }
  
  }

  GetImageUrl() {
    let result = this.appSession.getImageData(this.editProperty.coverThumbnail, 'image', '../../../assets/img/top-header1.jpg');
    return result;

  }

  onUploadFinished(event) {
    if (this.upOtions.uploadType == PSUploadType[PSUploadType.CoverImage]) {
      this.editProperty = event;
      this.appSession.editItem = event;
      if (this.appSession.selectedProperty != null && this.editProperty.id == this.appSession.selectedProperty.id) {
        this.appSession.setSelectedProperty(this.editProperty);
      }
      if (this.propertySource.propInfoList != null && this.propertySource.propInfoList.length > 1) {
        let itemIndex = this.propertySource.propInfoList.findIndex(item => item.id == this.editProperty.id);
        if (itemIndex > -1) {

          this.propertySource.propInfoList[itemIndex] = this.editProperty;
          this.propertySource.propInfoListChange.next(this.propertySource.propInfoList);
        }
      }
      else if (this.appSession.properties != null && this.appSession.properties.length > 0) {
        let itemIndex = this.appSession.properties.findIndex(item => item.id == this.editProperty.id);
        if (itemIndex > -1) {

          this.appSession.properties[itemIndex] = this.editProperty;
          this.propertySource.propInfoListChange.next(this.appSession.properties);
        }
      }
    }
  }

  changeTab(tabName:string) {
   
    this.currentTab = tabName;
    this.setUploadOptions(this.currentTab);
  }
 

  private setUploadOptions(uploadType: string) {
    this.upOtions.name = uploadType;
    if (this.currentTab == PSUploadType[PSUploadType.CoverImage]) {
      
      this.upOtions.hasThumbnail = false;
      this.upOtions.thumbnailWidth = 440;
      this.upOtions.thumbnaiHeight = 160;
    }
  }
}
