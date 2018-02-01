import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../../service/appsession.service';
import { PropertyInformation } from '../model/property.model';

@Component({
  selector: 'app-aboutinfo',
  templateUrl: './aboutinfo.component.html'
})
export class AboutinfoComponent implements OnInit {
  selectedProperty: PropertyInformation = new PropertyInformation();
  constructor(private appsession: AppsessionService) { }

  ngOnInit() {

    if (this.appsession.IsUserLoggedIn) {

      if (this.appsession.selectedProperty != null) {

        this.selectedProperty = this.appsession.selectedProperty;
      }
    }
    else {
      this.selectedProperty = this.appsession.selectedProperty;
    }

  }

}
