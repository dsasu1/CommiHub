import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../../../service/appsession.service';
import { UserTypeEnum } from '../../../common/AppConstants';


@Component({
  selector: 'app-prop-resident',
  templateUrl: './prop-resident.component.html'
})
export class PropResidentComponent implements OnInit {
  currentTab: string = "current";
  isTenant: boolean = false;
  headerTitle: string = "Residents";
  constructor(private appsession: AppsessionService) { }

  ngOnInit() {
    if (this.appsession.IsUserLoggedIn) {

      this.isTenant = this.appsession.CurrentUser.userTypeEnum == UserTypeEnum[UserTypeEnum.Tenant];

      if (this.isTenant) {
        this.headerTitle = 'AptUnitHouses';
      }
    }
  }

  changeTab(tabName: string) {

    this.currentTab = tabName;
  }



}
