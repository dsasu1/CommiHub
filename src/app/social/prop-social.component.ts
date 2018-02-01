import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../service/appsession.service';
import { ErrorMessage } from '../model/utility.model';
import { UserSession } from '../model/usersession.model';
import { AppConstants } from '../common/AppConstants';


@Component({
  selector: 'app-prop-social',
  templateUrl: './prop-social.component.html'
})
export class PropSocialComponent implements OnInit {

  InfoMsg: ErrorMessage = new ErrorMessage();
  isOpenForm: boolean = false;
  constructor(private appsession: AppsessionService) { }

  ngOnInit() {
    
  }

  openForm(open: boolean) {
    this.InfoMsg.clear();
    if (!open) {
      // this.staffForm = new Staff();
    }

    this.isOpenForm = open;
  }

}
