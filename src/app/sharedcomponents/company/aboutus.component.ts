import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../../service/appsession.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html'
})
export class AboutusComponent implements OnInit {

    titleKey: string = "About";
    constructor(private appsession: AppsessionService) {
    }

    ngOnInit() {
        this.appsession.SetAppTitle(this.titleKey);
    }

}
