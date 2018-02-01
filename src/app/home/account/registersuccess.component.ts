import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../../service/appsession.service';


@Component({
  selector: 'app-registersuccess',
  templateUrl: './registersuccess.component.html'
})
export class RegistersuccessComponent implements OnInit {
    tempUser: any = null;
    titleKey: string = "RegisterSuccess";
    constructor(private appsession: AppsessionService) {
    }

    ngOnInit() {
      if (!this.appsession.JustRegistered) {
        this.appsession.redirectToRoute();
        }
        this.appsession.SetAppTitle(this.titleKey);
        this.tempUser = this.appsession.TempUser;
    }

}
