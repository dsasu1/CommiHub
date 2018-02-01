import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserSession } from '../model/usersession.model';
import { AppsessionService } from '../service/appsession.service';
import { AvailableRole } from './model/role.model';


@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html'
})
export class ManageRoleComponent implements OnInit {
  role: AvailableRole;
  
  constructor(private appsession: AppsessionService, private route: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.appsession.IsUserLoggedIn) {
      let code = this.activeRoute.snapshot.params["id"];
      if (code == null) {
        this.route.navigate(['/newsfeed']);
        return;
      }

      this.role = this.appsession.editItem;
    
    }

  }

}
