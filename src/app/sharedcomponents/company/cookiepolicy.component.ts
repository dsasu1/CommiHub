import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../../service/appsession.service';

@Component({
  selector: 'app-cookiepolicy',
  templateUrl: './cookiepolicy.component.html'
})
export class CookiepolicyComponent implements OnInit {

    titleKey: string = "Cookies";
    constructor(private appsession: AppsessionService) {
    }

    ngOnInit() {
        this.appsession.SetAppTitle(this.titleKey);
    }


}
