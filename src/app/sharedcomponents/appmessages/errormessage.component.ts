import { Component, Input, OnInit } from '@angular/core';
import { ErrorMessage } from '../../model/utility.model';

@Component({
  selector: 'app-errormessage',
  templateUrl: './errormessage.component.html'
})
export class ErrormessageComponent implements OnInit {
  @Input() appMsg: ErrorMessage;
  constructor() { }

  ngOnInit() {

  }

}
