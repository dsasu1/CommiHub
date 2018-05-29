import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../service/BaseService';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServiceRequestMod, ServiceRequestStatusMod } from '../model/servicerequest.model';
import { Subject } from 'rxjs';

@Injectable()
export class ServiceRequestService extends AbstractRestService {
  private controller: string = "ServiceRequests/";
  srListChange: Subject<ServiceRequestMod[]> = new Subject<ServiceRequestMod[]>();
  constructor(http: HttpClient) {
    super(http)

  }
  saveServiceRequest(srRequest: ServiceRequestMod) {
    return this.postItem<ServiceRequestMod>(this.controller + "SaveServiceRequest", srRequest);
  }

  saveRequestStatus(statusMod: ServiceRequestStatusMod) {
    return this.postItem<boolean>(this.controller + "SaveRequestStatus", statusMod);
  }

  getServiceRequests(userId: string, propertyId: string) {
    let httpParams: HttpParams = new HttpParams().append("userId", userId).append("propertyId", propertyId);
    return this.getItem<ServiceRequestMod[]>(this.controller + "GetServiceRequests", httpParams)
  }

  loadServiceRequests(userId: string, propertyId: string) {
    this.getServiceRequests(userId, propertyId).subscribe(data => {
      this.srListChange.next(data);

    });
  }
}
