import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../../service/appsession.service';
import { PropertyInformation } from '../model/property.model';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html'
})
export class EditInfoComponent implements OnInit {
  currentTab: string = "Basics";
  editProperty: PropertyInformation = new PropertyInformation();
  constructor(private appsession: AppsessionService, private route: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {

    if (this.appsession.editItem != null) {

      this.editProperty = <PropertyInformation>this.appsession.editItem;
    }
  }

  changeTab(tabName: string) {

    this.currentTab = tabName;
  }


}
