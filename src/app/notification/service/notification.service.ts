import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../service/BaseService';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotifictionMod, NotificationMasterMod} from '../model/notification.model';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class NotificationService extends AbstractRestService {
  private controller: string = "Notifications/";
  notifyListChange: Subject<NotificationMasterMod> = new Subject<NotificationMasterMod>();
  filteredNotifyListChange: Subject<NotifictionMod[]> = new Subject<NotifictionMod[]>();
  private currentProperty: string;
  notificationMaster: NotificationMasterMod;

  constructor(http: HttpClient) {
    super(http)

}

  getNotifications(userId: string, propertyId: string, isMainPageView: boolean) {
    let httpParams: HttpParams = new HttpParams().append("userId", userId).append("propertyId", propertyId).append("isMainPageView", isMainPageView? "true" : "false");
    return this.getItem<NotificationMasterMod>(this.controller + "GetNotifications", httpParams)
  }

  loadNotifications(userId: string, propertyId: string, isMainPageView: boolean) {

    if (!isMainPageView) {
      if (propertyId == this.currentProperty) {
        if (this.notificationMaster != null) {

          this.notifyListChange.next(this.notificationMaster);
          return;
        }
      }
    }
   
    this.currentProperty = propertyId;
    this.getNotifications(userId, propertyId, isMainPageView).subscribe(data => {

      if (data != null) {
        this.notificationMaster = data;
        this.notifyListChange.next(data);
      }
     
     
    });
  }

}
