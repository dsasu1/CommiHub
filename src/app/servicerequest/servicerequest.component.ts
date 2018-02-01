import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../service/appsession.service';
import { UserTypeEnum } from '../common/AppConstants';

@Component({
  selector: 'app-servicerequest',
  templateUrl: './servicerequest.component.html'
})
export class ServicerequestComponent implements OnInit {
  titleKey: string = "ServiceRequests";
  isTenant: boolean = false;

  constructor(private appsession: AppsessionService) {
        
    }

    ngOnInit() {
      this.appsession.SetAppTitle(this.titleKey);

      this.isTenant = this.appsession.CurrentUser.userTypeEnum == UserTypeEnum[UserTypeEnum.Tenant]
      
    }

  
}
