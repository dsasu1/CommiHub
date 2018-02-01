import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../service/appsession.service';
import { ErrorMessage } from '../model/utility.model';
import { UserSession } from '../model/usersession.model';
import { AppConstants } from '../common/AppConstants';
import { AvailableRole } from '../role/model/role.model';


@Component({
  selector: 'app-role-notification',
  templateUrl: './role-notification.component.html'
})
export class RoleNotificationComponent implements OnInit {
  InfoMsg: ErrorMessage = new ErrorMessage();
  dropDownLabel: string;
  items: number[] = [1, 2, 3, 4, 5, 6, 6];
  checked: boolean;
  constructor(private appsession: AppsessionService) { }

  ngOnInit() {
    this.dropDownLabel = this.appsession.getTranslated(AppConstants.Select);
  }


}
