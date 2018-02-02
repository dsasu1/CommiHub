import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppsessionService } from '../../service/appsession.service'
import { UserSession } from '../../model/usersession.model';

@Component({
  selector: 'app-sidebars',
  templateUrl: './sidebars.component.html'

})
export class SidebarsComponent implements OnInit, OnDestroy {
    currentUser: UserSession;
    leftSideMenuOpen: boolean = false;
    isLoggedIn: boolean = false;
    subscription: any;
    subscriptionTwo: any;
    subscriptionThree: any;
    constructor(private appsession: AppsessionService) {
       
    }

    OpenLeftMenu() {
        this.appsession.OpenLeftMenu(true);
    }

    CloseLeftMenu() {
        this.appsession.OpenLeftMenu(false);
    }
    
    GetImageUrl() {
      let result = this.appsession.getImageData(this.currentUser.userVM.photoThumbnail, 'image', '../../../assets/img/avatar1.jpg');
      return result;

    }

    ngOnInit() {
      this.subscription = this.appsession.LeftMenuOpenChange.subscribe(value => {
        this.leftSideMenuOpen = value;
      })
      this.subscriptionTwo =  this.appsession.UserSessionChange.subscribe((value) => {
        this.currentUser = value
      });

      this.subscriptionThree = this.appsession.IsUserLoggedInChange.subscribe(value => {
        this.isLoggedIn = value;
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionTwo.unsubscribe();
    this.subscriptionThree.unsubscribe();
  }
}
