import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserSession } from '../../model/usersession.model';
import { AppsessionService } from '../../service/appsession.service';
import { PropertyInformation } from '../model/property.model';

@Component({
  selector: 'app-manageproperty',
  templateUrl: './manageproperty.component.html'
})
export class ManagepropertyComponent implements OnInit {
  activeProperty: PropertyInformation;
  currentUser: UserSession;
  constructor(private appsession: AppsessionService, private route: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.appsession.IsUserLoggedIn) {

      this.activeProperty = this.appsession.editItem;
     
    }
   

  }


}
