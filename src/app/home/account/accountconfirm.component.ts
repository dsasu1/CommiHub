import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../../service/appsession.service';
import { ActivatedRoute } from "@angular/router";
import { UsersService } from '../../service/model.service';
import { UserType, User } from '../../model/users.model';

@Component({
  selector: 'app-accountconfirm',
  templateUrl: './accountconfirm.component.html'
})
export class AccountconfirmComponent implements OnInit {
    isDoneLoading = false;
    titleKey: string = "ConfirmAccount";
    header: string;
    constructor(private appsession: AppsessionService, private userSource: UsersService, private activeRoute: ActivatedRoute) {
    }

    ngOnInit() {

        let code = this.activeRoute.snapshot.params["id"];
        if (code == null) {
          this.appsession.redirectToRoute();
          return;
        }

        this.appsession.SetAppTitle(this.titleKey);
        
        let user: User = new User();
        user.vericationCodeId = code
        this.userSource.confirmUser(user).subscribe(
            data => {
                this.header = this.appsession.getTranslated("AccountConfirmSuccess");
                this.isDoneLoading = true;
                return;
            },
            error => {
                let messages = this.appsession.getHttpErrorMessages(error);
                this.header = messages[0];
                this.isDoneLoading = true;
                return;
            }
        );

       
    }

}
