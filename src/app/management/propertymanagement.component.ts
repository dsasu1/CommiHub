import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../service/appsession.service';

@Component({
  selector: 'app-propertymanagement',
  templateUrl: './propertymanagement.component.html'
})
export class PropertymanagementComponent implements OnInit {
  titleKey: string = "Management";
  constructor(private appsession: AppsessionService) { }


  ngOnInit() {
    this.appsession.SetAppTitle(this.titleKey);
  }

}
