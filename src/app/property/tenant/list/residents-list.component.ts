import { Component, OnInit, Input , OnDestroy} from '@angular/core';
import { AppsessionService } from '../../../service/appsession.service';
import { ResidentsService } from '../service/residents.service';
import { ResidentsVM, ResidencyStatusVM } from '../model/residents.model';
import { PropertyInformation } from '../../model/property.model';
import { UserTypeEnum, AppConstants } from '../../../common/AppConstants';
import { MessageDetail } from '../../../model/utility.model';
import { PropertyService } from '../../service/property.service';


@Component({
  selector: 'app-residents-list',
  templateUrl: './residents-list.component.html'
})
export class ResidentsListComponent implements OnInit {
  @Input() displayType: string = "current"; // current/ pending/ past/
  confirmAlertOption: any;
  subscription: any;
  availabledata: ResidentsVM[];
  currentdata: ResidentsVM[] = new Array<ResidentsVM>();
  isTenant: boolean = false;
  constructor(private appsession: AppsessionService, private residentService: ResidentsService, private propService: PropertyService) { }

  ngOnInit() {
    this.confirmAlertOption = { title: this.appsession.getTranslated("Confirm"), text: this.appsession.getTranslated("AreYouSure"), showCancelButton: true, type: 'question' };
    this.subscription = this.residentService.residentsListChange.subscribe(value => {

      if (value != null) {
        if (this.displayType == 'pending') {
          this.availabledata = value.filter(x => x.isApproved == null);
        }
        else if (this.displayType == 'current') {
          this.availabledata = value.filter(x => x.isApproved == true && !x.isMovedOut);
        }
        else if (this.displayType == 'past') {
          this.availabledata = value.filter(x => x.isApproved == true && x.isMovedOut);
        }
      }
       
      if (this.availabledata != null) {
        this.currentdata = this.appsession.paginate(this.availabledata, this.appsession.defaultPageSize, this.appsession.defaultPageSize);
      }
    });
    if (this.appsession.IsUserLoggedIn) {
      let property = <PropertyInformation>this.appsession.editItem;

      this.residentService.loadResidents(this.appsession.CurrentUser.userVM.id, property.id);
      this.isTenant = this.appsession.CurrentUser.userTypeEnum == UserTypeEnum[UserTypeEnum.Tenant];
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getStatusText(resident: ResidentsVM) {
    if (resident.isApproved == null) {

    }
  }

  GetImageUrl(userPhoto: string) {
    let result = this.appsession.getImageData(userPhoto, 'image', '../../../assets/img/avatar1.jpg');
    return result;

  }

  statusChangeClick(changeType: string, changeValue: boolean, resident: ResidentsVM) {

    if (resident.isDemoAccount) {
      let message: MessageDetail = new MessageDetail();
      message.isInfo = true;
      message.msg = this.appsession.getTranslated("DemoFunctionalityLimited");
      this.appsession.setGlobalHeaderMessage(message);
      return;
    }

    let residentStatus: ResidencyStatusVM = new ResidencyStatusVM();
    residentStatus.changeValue = changeValue;
    residentStatus.id = resident.id;
    residentStatus.statusType = changeType;
    residentStatus.residentUserId = resident.userId;
    residentStatus.changerUserId = this.appsession.CurrentUser.userVM.id;
    residentStatus.propertyInformationId = resident.propertyInformationId;
    
    this.residentService.saveResidencyStatus(residentStatus).subscribe(data => {
      if (data == true) {
      
        let property = <PropertyInformation>this.appsession.editItem;
        this.residentService.loadResidents(this.appsession.CurrentUser.userVM.id, property.id);
        if (changeType == "Cancel") {

          this.propService.loadUserProperties(this.appsession.CurrentUser.userVM.id);
        }
      }
    },
      error => {
        let message: MessageDetail = new MessageDetail();
        message.isSuccess = false
        message.msg = this.appsession.getTranslated(AppConstants.SomethingWrong);
        this.appsession.setGlobalHeaderMessage(message);
      }
    );
  }
}
