import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../service/appsession.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html'
})
export class NewsfeedComponent implements OnInit {
  titleKey: string = "Posts";
  constructor(private appsession: AppsessionService) {
    }

    ngOnInit() {
      this.appsession.SetAppTitle(this.titleKey);

     
    }


}
