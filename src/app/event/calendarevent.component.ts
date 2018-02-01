import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../service/appsession.service';

@Component({
  selector: 'app-calendarevent',
  templateUrl: './calendarevent.component.html'
})
export class CalendareventComponent implements OnInit {
  events: any[] = new Array<any>();
    titleKey: string = "CalendarandEvents";
    constructor(private appsession: AppsessionService) {
    }

    ngOnInit() {
      this.appsession.SetAppTitle(this.titleKey);
      this.events = [
        {
          "title": "All Day Event",
          "start": "2016-01-01"
        },
        {
          "title": "Long Event",
          "start": "2016-01-07",
          "end": "2016-01-10"
        },
        {
          "title": "Repeating Event",
          "start": "2016-01-09T16:00:00"
        },
        {
          "title": "Repeating Event",
          "start": "2016-01-16T16:00:00"
        },
        {
          "title": "Conference",
          "start": "2016-01-11",
          "end": "2016-01-13"
        }
      ];
  }

}
