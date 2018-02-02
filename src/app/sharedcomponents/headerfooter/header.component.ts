import { Component, OnInit, OnDestroy} from '@angular/core';
import { AppsessionService } from '../../service/appsession.service';
import { UserSession } from '../../model/usersession.model';
import { ErrorMessage } from '../../model/utility.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    headerInfoMessage: ErrorMessage = new ErrorMessage();
    currentUser: UserSession = new UserSession();
    title: string = "";
    isLoggedIn: boolean = false;
    unseenNotificationCount: number = 0;
    private subsriptionHeaderMsg: any;
    private subsriptionTitle: any;
    private subsriptionUserSession: any;
    private subsriptionIsUserLoggedIn: any;
    private subsriptionUnviewedNotificationCount: any;
    constructor(private appsession: AppsessionService) {
      this.subsriptionUnviewedNotificationCount = this.appsession.currentUnviewdNotificationCountChange.subscribe(value => {
        this.unseenNotificationCount = value;
      });
      this.subsriptionTitle = this.appsession.AppTitleChange.subscribe((value) => {
            this.title = value
        });
      this.subsriptionUserSession =  this.appsession.UserSessionChange.subscribe((value) => {
            this.currentUser = value
        });

      this.subsriptionIsUserLoggedIn =  this.appsession.IsUserLoggedInChange.subscribe(value => {
            this.isLoggedIn = value;
        })
    }

    ngOnInit() {
      this.subsriptionHeaderMsg = this.appsession.HeaderInfoMsgChange.subscribe(value => {
        this.headerInfoMessage.isGrowl = true;
        if (value.isInfo) {
          this.headerInfoMessage.isInfoMessage();
        }
        else if (value.isSuccess) {
          this.headerInfoMessage.isSuccessMessage();
        }
        else if (!value.isSuccess) {
          this.headerInfoMessage.isErrorMessage();
        }


        this.headerInfoMessage.lifeSpanInMilli = value.lifeSpanInMilli;

        this.headerInfoMessage.add(value.msg);
       
      });

        let userSess = this.appsession.getCurrentUser();
        if (userSess != null && userSess.userVM != null && userSess.userVM.lang != null) {
            this.appsession.setTranslateLang(userSess.userVM.lang);
        }
    }

    GetImageUrl() {
      let result = this.appsession.getImageData(this.currentUser.userVM.photoThumbnail, 'image', '../../../assets/img/avatar1.jpg');
      return result;

    }

    routeToNotification() {
      this.appsession.redirectToRoute("/notification");
    }

    ngOnDestroy() {

      this.subsriptionHeaderMsg.unsubscribe();
      this.subsriptionTitle.unsubscribe();
      this.subsriptionUserSession.unsubscribe();
      this.subsriptionIsUserLoggedIn.unsubscribe();
      this.subsriptionUnviewedNotificationCount.unsubscribe();

    }


}
