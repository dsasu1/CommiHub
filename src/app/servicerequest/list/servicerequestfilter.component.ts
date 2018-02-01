import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceRequestMod } from '../model/servicerequest.model';
import { AppsessionService } from '../../service/appsession.service';
import { ServiceRequestService } from '../service/servicerequest.service';

@Component({
  selector: 'app-servicerequestfilter',
  templateUrl: './servicerequestfilter.component.html',
  styles: []
})
export class ServicerequestfilterComponent implements OnInit {
  availableData: ServiceRequestMod[];
  private subscription: any;
  isFilterMode: boolean = false;
  filterValue: string;
  constructor(private appsession: AppsessionService, private serviceRequestSource: ServiceRequestService) { }

  ngOnInit() {
    this.subscription = this.serviceRequestSource.srListChange.subscribe(value => {
      if (!this.isFilterMode) {
        this.availableData = value;
      }

    });
  }

  filterResult() {

    if (this.filterValue != null || this.filterValue.trim() != '') {
      this.isFilterMode = true;
      let result = this.availableData.filter(x => x.tenantUnitAddress.toLowerCase().match(this.filterValue.toLowerCase()));
      this.serviceRequestSource.srListChange.next(result);
    }
    
   
  }

  clearFilter() {
    this.filterValue = null;
    if (this.isFilterMode) {
 
      this.isFilterMode = false;
      this.serviceRequestSource.srListChange.next(this.availableData);
    }
   
  }

  ngOnDestroy() {

    this.subscription.unsubscribe();
  }
}
