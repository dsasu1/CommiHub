import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../service/appsession.service';
import { ErrorMessage } from '../model/utility.model';
import { UserSession } from '../model/usersession.model';
import { AppConstants } from '../common/AppConstants';

@Component({
  selector: 'app-prop-page',
  templateUrl: './prop-page.component.html'
})
export class PropPageComponent implements OnInit {
  InfoMsg: ErrorMessage = new ErrorMessage();
  dropDownLabel: string;
  isOpenForm: boolean = false;
  constructor(private appsession: AppsessionService) { }

  ngOnInit() {
    this.dropDownLabel = this.appsession.getTranslated(AppConstants.Select);
  }

  openForm(open: boolean) {
    this.InfoMsg.clear();
    if (!open) {
      // this.staffForm = new Staff();
    }

    this.isOpenForm = open;
  }

 

}
