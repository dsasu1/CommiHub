import { Component, OnInit, Input } from '@angular/core';
import { ErrorMessage } from '../../model/utility.model';
import { SelectItem } from 'primeng/components/common/api';
import { Message } from 'primeng/components/common/api';

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
