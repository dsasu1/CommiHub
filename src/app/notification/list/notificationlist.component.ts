import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NotifictionMod, NotificationMasterMod } from '../model/notification.model';
import { NotificationService } from '../service/notification.service';
import { AppsessionService } from '../../service/appsession.service';

@Component({
  selector: 'app-notificationlist',
  templateUrl: './notificationlist.component.html',
  styles: []
})
export class NotificationlistComponent implements OnInit, OnDestroy {
  notifyMaster: NotificationMasterMod;
  availableData: NotifictionMod[];
  currentData: NotifictionMod[] = new Array<NotifictionMod>();
  unseenNotificationCount:number = 0;
  @Input() isMainPage: boolean = false;
  private subscriptionNotifyList: any;
  private subscriptionSelectedProperty: any;
  private subscriptionFilterdNotify: any;
  private subscriptionUnSeenNotifyCount;
  trackingBy(index: number, data: NotifictionMod): string { return data.id; }
  constructor(private appsession: AppsessionService, private notifyService: NotificationService) { }

  ngOnInit() {
    if (this.isMainPage) {
      this.subscriptionFilterdNotify = this.notifyService.filteredNotifyListChange.subscribe(value => {
        this.availableData = value;
        if (this.availableData != null) {
          this.currentData = this.appsession.paginate(this.availableData, this.appsession.defaultPageSize, this.appsession.defaultPageSize);
        }
      });
    }

    this.subscriptionUnSeenNotifyCount = this.appsession.currentUnviewdNotificationCountChange.subscribe(value => {
      this.unseenNotificationCount = value;
    });
    this.subscriptionSelectedProperty = this.appsession.selectedPropertyChange.subscribe(value => {
      let selectedProperty = Object.assign({}, value);

      if (selectedProperty != null) {
        this.notifyService.loadNotifications(this.appsession.CurrentUser.userVM.id, selectedProperty.id, this.isMainPage);
      }

    });

    this.subscriptionNotifyList = this.notifyService.notifyListChange.subscribe(value => {
      if (value != null) {
        this.notifyMaster = value;

        this.appsession.currentUnviewdNotificationCountChange.next(value.nonViewedCount);
        this.availableData = value.notificationVMS;
        if (this.availableData != null) {
          this.currentData = this.appsession.paginate(this.availableData, this.appsession.defaultPageSize, this.appsession.defaultPageSize);
        }
      }
    
    });

    if (this.appsession.selectedProperty != null) {
      if (this.isMainPage) {
        this.notifyService.loadNotifications(this.appsession.CurrentUser.userVM.id, this.appsession.selectedProperty.id, this.isMainPage);
      }
    }
  }
  routeToNotification() {
    this.appsession.redirectToRoute("/notification");
  }
  ngOnDestroy() {
    if (this.isMainPage) {
      this.subscriptionFilterdNotify.unsubscribe();
    }
    this.subscriptionNotifyList.unsubscribe();
    this.subscriptionSelectedProperty.unsubscribe();
  }

}
