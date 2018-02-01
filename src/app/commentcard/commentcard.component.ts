import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../service/appsession.service';


@Component({
  selector: 'app-commentcard',
  templateUrl: './commentcard.component.html'
})
export class CommentcardComponent implements OnInit {
  titleKey: string = "CommentCard";
  constructor(private appsession: AppsessionService) {
    }

    ngOnInit() {
      this.appsession.SetAppTitle(this.titleKey);

    }

 

}
