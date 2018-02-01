import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../service/appsession.service';
import { UserSession } from '../model/usersession.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  currentUser: UserSession;
    titleKey: string = "Profile";
    constructor(private appsession: AppsessionService) {
    }

    ngOnInit() {

      if (this.appsession.IsUserLoggedIn != null) {
        this.currentUser = this.appsession.CurrentUser;
        this.titleKey = this.currentUser.userVM.firstName;
      }
      else {

      }
      this.appsession.SetAppTitle(this.titleKey);
  }

}
