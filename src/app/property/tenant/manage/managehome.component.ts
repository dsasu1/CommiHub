import { Component, OnInit } from '@angular/core';
import { UserSession } from '../../../model/usersession.model';
import { AppsessionService } from '../../../service/appsession.service';
import { PropertyInformation } from '../../model/property.model';
@Component({
  selector: 'app-managehome',
  templateUrl: './managehome.component.html',
  styles: []
})
export class ManagehomeComponent implements OnInit {
  activeProperty: PropertyInformation;
  constructor(private appsession: AppsessionService) { }

  ngOnInit() {
    if (this.appsession.IsUserLoggedIn) {

      this.activeProperty = this.appsession.editItem;

    }

  }

}
