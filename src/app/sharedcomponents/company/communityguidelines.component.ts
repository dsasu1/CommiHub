import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../../service/appsession.service';

@Component({
  selector: 'app-communityguidelines',
  templateUrl: './communityguidelines.component.html'
})
export class CommunityguidelinesComponent implements OnInit {

    titleKey: string = "Guidelines";
    constructor(private appsession: AppsessionService) {
    }

    ngOnInit() {
        this.appsession.SetAppTitle(this.titleKey);
    }

}
