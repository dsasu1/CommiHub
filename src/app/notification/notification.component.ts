import { Component, OnInit , OnDestroy} from '@angular/core';
import { AppsessionService } from '../service/appsession.service';
import { NotificationService } from './service/notification.service';
import { NotifictionMod, NotificationMasterMod } from './model/notification.model';
import { AppConstants, PSNotificationType } from '../common/AppConstants';
import { SwPush } from '@angular/service-worker';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit, OnDestroy {
  private notificationMaster: NotificationMasterMod;
  availableData: NotifictionMod[];
  currentData: NotifictionMod[] = new Array<NotifictionMod>();
  titleKey: string = "Notification";
  isDataFetched: boolean = false;
  allCount: number = 0;
  srCount: number = 0;
  cmCount: number = 0;
  rvCount: number = 0;
  resCount: number = 0;
  
  private subscription: any;
    constructor(private appsession: AppsessionService, private notifyService: NotificationService, private swPush: SwPush) {
    }

    ngOnInit() {
      this.subscription = this.notifyService.notifyListChange.subscribe(data => {

        if (data != null) {
          this.availableData = data.notificationVMS;

          this.allCount = data.nonViewedCount;

          this.srCount = this.availableData.filter(x => x.notificationTypeEnum == PSNotificationType[PSNotificationType.ServiceRequest] && x.addedDateUtc > data.lastViewDateUTC).length
          this.cmCount = this.availableData.filter(x => x.notificationTypeEnum == PSNotificationType[PSNotificationType.CommentCard] && x.addedDateUtc > data.lastViewDateUTC).length
          this.rvCount = this.availableData.filter(x => x.notificationTypeEnum == PSNotificationType[PSNotificationType.Review] && x.addedDateUtc > data.lastViewDateUTC).length
          this.resCount = this.availableData.filter(x => x.notificationTypeEnum == PSNotificationType[PSNotificationType.Residents] && x.addedDateUtc > data.lastViewDateUTC).length
        }
    
      });
      this.appsession.SetAppTitle(this.titleKey);

    }

    enablePushNotification(){
         this.swPush.requestSubscription({
             serverPublicKey: environment.pushPublickKey
         }).then(sub =>{
           console.log(sub);
              let defaultOptions ={
                title: this.appsession.getTranslated("CommiHub"),
                body: this.appsession.getTranslated("PushNoficationEnabled"),
                icon: "/assets/images/sitelogo/android-icon-96x96.png",
                vibrate: [100,50,100]

              };

               new Notification(this.appsession.getTranslated("CommiHub"),defaultOptions);
         })
         .catch(err=>{

         });
    }

    filerByType(typeValue: string) {
      if (typeValue == 'All') {
        this.notifyService.filteredNotifyListChange.next(this.availableData);
        return;
      }

      this.currentData = this.availableData.filter(x => x.notificationTypeEnum == typeValue);
      this.notifyService.filteredNotifyListChange.next(this.currentData);


    }

    ngOnDestroy() {

      this.appsession.currentUnviewdNotificationCountChange.next(0);
      this.subscription.unsubscribe();
    }


}
