import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppsessionService } from '../../service/appsession.service';
import { PropertyInformation, PropertyType} from '../model/property.model';
import { ErrorMessage, MessageDetail } from '../../model/utility.model';
import { UserSession } from '../../model/usersession.model';
import { AppConstants, UserTypeEnum, ChangeType } from '../../common/AppConstants';
import { GlobalService } from '../../service/model.service';
import { PropertyService } from '../service/property.service';
import { Country } from '../../model/global.model';

@Component({
  selector: 'app-basicpropertyform',
  templateUrl: './basicpropertyform.component.html'
})
export class BasicpropertyformComponent implements OnInit {
  @Input() newProperty: PropertyInformation;
  @Input() isPropManage: boolean;
  @Input() isAdvanceInfo: boolean;
    propInfoMsg: ErrorMessage = new ErrorMessage();
    siteConstant: AppConstants = AppConstants;
    propTypes: PropertyType[] = new Array<PropertyType>();
    countries: Country[] = new Array<Country>();
    isOpenForm: boolean = false;
    isExternalLookUpEnabled: boolean = false;
    isSubmitted: boolean = false;
    constructor(private appsession: AppsessionService, private globalSource: GlobalService, private propertySource: PropertyService) { }

    ngOnInit() {

      if (this.newProperty == null) {
        this.newProperty = new PropertyInformation();
      }
      this.globalSource.getCountries().subscribe(data => this.countries = data);
      this.propertySource.getPropertyTypes().subscribe(data => this.propTypes = data);
      this.isOpenForm = this.isPropManage;
      
  }

  openForm(open: boolean) {
  
    this.propInfoMsg.clear();
    if (!open) {
      this.newProperty = new PropertyInformation();
    }
      this.isOpenForm = open;
  }

  onPropSubmit(form: NgForm) {

    if (this.newProperty.isDemoAccount) {
      let message: MessageDetail = new MessageDetail();
      message.isInfo = true;
      message.msg = this.appsession.getTranslated("DemoFunctionalityLimited");
      this.appsession.setGlobalHeaderMessage(message);
      return;
    }
  
     this.propInfoMsg.clear();
      if (form.valid) {
        this.isSubmitted = true;
          this.newProperty.userId = this.appsession.CurrentUser.userVM.id;

          this.propertySource.savePropertyInfo(this.newProperty).subscribe(
              data => {             
                this.isSubmitted = false;
                let currentUser = this.appsession.CurrentUser;

                if (this.isPropManage) {
                  this.newProperty = data;
                  if (this.appsession.selectedProperty != null && this.newProperty.id == this.appsession.selectedProperty.id) {
         
                    this.appsession.setSelectedProperty(this.newProperty);
                  }
                  if (this.propertySource.propInfoList != null && this.propertySource.propInfoList.length > 1) {
          
                    let itemIndex = this.propertySource.propInfoList.findIndex(item => item.id == data.id);
                    if (itemIndex > -1) {

                      this.propertySource.propInfoList[itemIndex] = data;
                      this.propertySource.propInfoListChange.next(this.propertySource.propInfoList);
                    }
                  }

                }
                else {
                  if (this.newProperty.id == null) {
                    this.propertySource.loadUserProperties(this.appsession.CurrentUser.userVM.id);
                    if (this.appsession.selectedProperty == null && this.propertySource.propInfoList != null) {
                      this.appsession.setSelectedProperty(this.propertySource.propInfoList[0]);
                    }
                    else if (this.appsession.selectedProperty == null) {
                      this.appsession.setSelectedProperty(data);
                    }
                    form.reset();
                    this.isOpenForm = false;
                  }

                }

                this.appsession.setGlobalHeaderMessage();
    
                return;
              },
              error =>
              {
                this.isSubmitted = false;
                  let messages = this.appsession.getHttpErrorMessages(error);
                  this.propInfoMsg.addRange(messages);
                  return;
              }
          )
      }
  }


  onCodeBlur(event: Event): void {

    let count = this.countries.filter(x => x.code == this.newProperty.zipCode.countryCode);

      if (count.length > 0) {

        let country = count[0];
      this.isExternalLookUpEnabled = country.isLookupEnabled;
      }
      if (this.isExternalLookUpEnabled && this.newProperty.zipCode.code != null && this.newProperty.zipCode.code.length > 4) {

        this.globalSource.lookUpZip(this.newProperty.zipCode.code).subscribe(
              data => {
                  if (data != null) {
                      this.newProperty.zipCode.id = data.id;
                      this.newProperty.zipCode.city = data.city;
                      this.newProperty.zipCode.province = data.province;
                      this.newProperty.zipCode.latitude = data.latitude;
                      this.newProperty.zipCode.longitude = data.longitude;
                      this.newProperty.zipCode.county = data.county;
                  }

                  return;
              },
              error => {
                  alert(error);
                  return;
              }
          )
      }
  }


  

}
