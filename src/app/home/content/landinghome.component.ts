import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppsessionService } from '../../service/appsession.service'
@Component({
  selector: 'app-landinghome',
  templateUrl: './landinghome.component.html'

})
export class LandinghomeComponent implements OnInit, OnDestroy{
  titleKey: string = "Welcome";
  isLoggedIn: boolean = false;
  subscription: any;
    constructor(private appsession: AppsessionService) {
    }

    ngOnInit() {
      this.subscription = this.appsession.IsUserLoggedInChange.subscribe(value => {
        this.isLoggedIn = value;
      })
        this.appsession.SetAppTitle(this.titleKey);
        if (this.appsession.IsUserLoggedIn || this.appsession.getCurrentUser() != null) {
          this.appsession.redirectToRoute("/newsfeed");
          return;
        }
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

}
