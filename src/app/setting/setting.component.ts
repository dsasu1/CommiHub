import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../service/appsession.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html'
})
export class SettingComponent implements OnInit {

    titleKey: string = "Settings";
    constructor(private appsession: AppsessionService) {
    }


    ngOnInit() {
        this.appsession.SetAppTitle(this.titleKey);
  }

}
