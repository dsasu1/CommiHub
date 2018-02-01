import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../../service/appsession.service';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html'
})
export class PrivacypolicyComponent implements OnInit {


    titleKey: string = "Privacy";
    constructor(private appsession: AppsessionService) {
    }

    ngOnInit() {
        this.appsession.SetAppTitle(this.titleKey);
    }

}
