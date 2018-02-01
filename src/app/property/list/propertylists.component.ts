import { Component, OnInit , Input, OnDestroy} from '@angular/core';
import { UserSession } from '../../model/usersession.model';
import { AppsessionService } from '../../service/appsession.service';
import { PropertyInformation, PropertyAccess } from '../model/property.model';
import { PropertyService } from '../service/property.service';
import {UserTypeEnum } from '../../common/AppConstants';
import { MessageDetail } from '../../model/utility.model';

@Component({
  selector: 'app-propertylists',
  templateUrl: './propertylists.component.html'
})
export class PropertylistsComponent implements OnInit, OnDestroy {
  userSession: UserSession;
  @Input() roleId: string;
  propInfos: PropertyInformation[];
  availabledata: PropertyInformation[];
  currentdata: PropertyInformation[] = new Array<PropertyInformation>();
  isTenant: boolean = false;

  private subscription: any;
  private subscriptionTwo: any;
  constructor(private appsession: AppsessionService, private propSource: PropertyService) { }

  trackingBy(index: number, data: PropertyInformation): string { return data.id; }

  ngOnInit() {
    this.subscription = this.propSource.propInfoListChange.subscribe(value => {

      this.propInfos = Object.assign([], value);
  
      if (this.roleId == null) {

        this.availabledata = this.propInfos;

         if (this.availabledata != null) {
          this.currentdata = this.appsession.paginate(this.availabledata, this.appsession.defaultPageSize, this.appsession.defaultPageSize);
         }
      }
      else {
        this.propSource.loadPropertyAccess(this.appsession.CurrentUser.userVM.id, this.roleId);
      }

    });

    if (this.roleId != null) {
      this.subscriptionTwo = this.propSource.propAccessListChange.subscribe(value => {
        if (this.propInfos != null) {
           
          if (value != null)
          {

            let tempProps: PropertyInformation[] = [];
            for (let i = 0; i < value.length; i++) {
              let filtered = this.propInfos.find(x => x.id == value[i].propertyInformationId);
              if (filtered != null) {
                tempProps.push(filtered);
              }

            }
            this.availabledata = tempProps;
            if (this.availabledata != null) {
              this.currentdata = this.appsession.paginate(this.availabledata, this.appsession.defaultPageSize, this.appsession.defaultPageSize);
            }
          }

        }

     
      });
    }

    if (this.appsession.IsUserLoggedIn) {
      this.isTenant = this.appsession.CurrentUser.userTypeEnum == UserTypeEnum[UserTypeEnum.Tenant];
      this.userSession = this.appsession.CurrentUser;
      if (this.propSource.propInfoList != null && this.propSource.propInfoList.length > 0) {
        this.propSource.propInfoListChange.next(this.propSource.propInfoList);
      }
      else if (this.appsession.properties != null && this.appsession.properties.length > 0) {
        this.propSource.propInfoListChange.next(this.appsession.properties);
      }
      else {
        this.propSource.loadUserProperties(this.appsession.CurrentUser.userVM.id);
      }


    }
   
  }

  GetImageUrl(prop: PropertyInformation) {
    let result = this.appsession.getImageData(prop.coverThumbnail, 'image', '../../../assets/img/top-header1.jpg');
    return result;

  }

  ondeleteProperty(index: number) {

    if (this.currentdata[index].isDemoAccount) {
      let message: MessageDetail = new MessageDetail();
      message.isInfo = true;
      message.msg = this.appsession.getTranslated("DemoFunctionalityLimited");
      this.appsession.setGlobalHeaderMessage(message);
      return;
    }
    if (this.roleId != null) {


      this.propSource.deletePropertyAccess(this.appsession.CurrentUser.userVM.id, this.currentdata[index].id, this.roleId).subscribe(data => {

        if (data) {
          this.propSource.loadUserProperties(this.appsession.CurrentUser.userVM.id);
        }
      });

    }
    else {

      this.propSource.deleteProperty(this.appsession.CurrentUser.userVM.id, this.currentdata[index].id).subscribe(data => {

        if (data) {
          this.propSource.loadUserProperties(this.appsession.CurrentUser.userVM.id);
        }
      },
        error => {
          let message: MessageDetail = new MessageDetail();
          message.isSuccess = false
          message.msg = this.appsession.getHttpErrorMessages(error)[0];
          this.appsession.setGlobalHeaderMessage(message);
        }


      );
    }
    

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    if (this.roleId != null) {
      this.subscriptionTwo.unsubscribe();
    }
   
  }

}
