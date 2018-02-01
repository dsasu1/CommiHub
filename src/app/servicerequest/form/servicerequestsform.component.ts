import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../../service/appsession.service';
import { UserSession } from '../../model/usersession.model';
import { PropertyInformation } from '../../property/model/property.model';
import { NgForm } from '@angular/forms';
import { AppConstants, UserTypeEnum } from '../../common/AppConstants';
import { ErrorMessage } from '../../model/utility.model';
import { ServiceRequestService } from '../service/servicerequest.service';
import { ServiceRequestMod } from '../model/servicerequest.model';
import { ResidentsService } from '../../property/tenant/service/residents.service';
import { ResidentsVM} from '../../property/tenant/model/residents.model';

@Component({
  selector: 'app-servicerequestsform',
  templateUrl: './servicerequestsform.component.html'
})
export class ServicerequestsformComponent implements OnInit {
  selectedProperty: PropertyInformation;
  siteConstant: AppConstants = AppConstants;
  currentUser: UserSession;
  serviceReq: ServiceRequestMod = new ServiceRequestMod();
  showForm: boolean = false;
  srInfoMsg: ErrorMessage = new ErrorMessage();
  canSeeSRForm: boolean = false;
  isSubmitted: boolean = false;
  resident: ResidentsVM;
  constructor(private appsession: AppsessionService, private serviceRequestSource: ServiceRequestService, private residentService: ResidentsService) { }

  ngOnInit() {
    if (this.appsession.IsUserLoggedIn) {
      this.currentUser = this.appsession.CurrentUser;
      if (this.appsession.selectedProperty != null) {

        this.selectedProperty = this.appsession.selectedProperty;
      }

      if (this.currentUser.userTypeEnum == UserTypeEnum[UserTypeEnum.Tenant]) {

        if (this.selectedProperty != null) {

          this.residentService.getResidents(this.currentUser.userVM.id, this.selectedProperty.id).subscribe(data => {
            if (data != null) {

              let residents = data.filter(x => x.isApproved == true && !x.isMovedOut)

              if (residents != null && residents.length > 0) {
                this.resident = residents[0];
                this.canSeeSRForm = true;
              }

            }

          });

        }
      }
      

    }
  }

  onSRSubmit(form: NgForm) {
    this.srInfoMsg.clear();
    if (form.valid) {
      this.isSubmitted = true;
      this.serviceReq.userId = this.currentUser.userVM.id;
      this.serviceReq.propertyInformationId = this.selectedProperty.id;
      this.serviceReq.tenantUnitAddress = this.resident.unitAddress;
      this.serviceReq.tenantUnitId = this.resident.id;
      this.serviceReq.requestStatusKey = "New";
      this.serviceRequestSource.saveServiceRequest(this.serviceReq).subscribe(
        data => {
          this.isSubmitted = false;
          this.appsession.setGlobalHeaderMessage();

          form.reset();
          this.serviceRequestSource.loadServiceRequests(this.currentUser.userVM.id, this.selectedProperty.id);
          this.showformClicked(false);
          return;
        },
        error => {
          this.isSubmitted = false;
          let messages = this.appsession.getHttpErrorMessages(error);
          this.srInfoMsg.addRange(messages);
          return;
        }

      )
    }
  }

  showformClicked(value: boolean) {
    this.srInfoMsg.clear();
    if (!value) {
      this.serviceReq = new ServiceRequestMod();
    }
    this.showForm = value
  }


}
