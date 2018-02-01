import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../../service/appsession.service';

@Component({
  selector: 'app-useragreement',
  templateUrl: './useragreement.component.html'
})
export class UseragreementComponent implements OnInit {
    titleKey: string = "Userterms";
    constructor(private appsession: AppsessionService) {
    }

    ngOnInit() {
        this.appsession.SetAppTitle(this.titleKey);
    }

}
