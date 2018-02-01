import { Component, OnInit , Input, OnDestroy} from '@angular/core';
import { ServiceRequestMod , ServiceRequestStatusMod} from '../model/servicerequest.model';
import { AppsessionService } from '../../service/appsession.service';
import { ServiceRequestService } from '../service/servicerequest.service';
import { UserTypeEnum } from '../../common/AppConstants';


@Component({
  selector: 'app-servicerequestslists',
  templateUrl: './servicerequestslists.component.html'
})
export class ServicerequestslistsComponent implements OnInit, OnDestroy {
  isTenant: boolean = false;
  availableServiceRequests: ServiceRequestMod[];
  currentServiceRequests: ServiceRequestMod[] = new Array<ServiceRequestMod>();
  private subscription: any;
  constructor(private appsession: AppsessionService, private serviceRequestSource: ServiceRequestService) { }

  trackingBy(index: number, data: ServiceRequestMod): string { return data.id; }

  ngOnInit() {
    this.isTenant = this.appsession.CurrentUser.userTypeEnum == UserTypeEnum[UserTypeEnum.Tenant]
    this.subscription = this.serviceRequestSource.srListChange.subscribe(value => {
      this.availableServiceRequests = value;

      if (this.availableServiceRequests != null) {

        this.currentServiceRequests = this.appsession.paginate(this.availableServiceRequests, this.appsession.defaultPageSize, this.appsession.defaultPageSize);;

      }
    });

    if (this.appsession.IsUserLoggedIn) {
  
      if (this.appsession.selectedProperty != null) {

        this.serviceRequestSource.loadServiceRequests(this.appsession.CurrentUser.userVM.id, this.appsession.selectedProperty.id);

        
      }   

    }

 
  }

  hideStatusCaret(statusKey: string) {

    return ["Completed", "Cancelled"].indexOf(statusKey) > -1;
  }

  isSameStatus(currentKey: string, statusKey: string) {
    return currentKey == statusKey;
  }

  onStatusClicked(index: number, selectedStatus: string) {
    let selectedRequest = this.currentServiceRequests[index];
    let serviceStatus: ServiceRequestStatusMod = new ServiceRequestStatusMod();
    serviceStatus.id = selectedRequest.id;
    serviceStatus.userId = this.appsession.CurrentUser.userVM.id;
    serviceStatus.statusKey = selectedStatus;

    this.serviceRequestSource.saveRequestStatus(serviceStatus).subscribe(data => {

      if (data) {
        selectedRequest.requestStatusKey = selectedStatus;
        this.currentServiceRequests[index] = selectedRequest;
      }

    });
  }

  ngOnDestroy() {

    this.subscription.unsubscribe();
  }

}
