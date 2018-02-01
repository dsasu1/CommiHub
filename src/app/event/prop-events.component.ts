import { Component, OnInit } from '@angular/core';
import { ErrorMessage } from '../model/utility.model';

@Component({
  selector: 'app-prop-events',
  templateUrl: './prop-events.component.html'
})
export class PropEventsComponent implements OnInit {
  InfoMsg: ErrorMessage = new ErrorMessage();
  isOpenForm: boolean = false;
  constructor() { }

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
