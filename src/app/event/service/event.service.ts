import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../service/BaseService';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EventMod } from '../model/event.model';



@Injectable()
export class EventsService extends AbstractRestService {
  private controller: string = "Events/";
  constructor(http: HttpClient) {
    super(http)

  }
  savePropertyEvent(propertyEvent: EventMod) {
    return this.postItem<EventMod>(this.controller + "SavePropertyEvent", propertyEvent);
  }

  getPropertyEvents(userId: string, propertyId: string) {
    let httpParams: HttpParams = new HttpParams().append("userId", userId).append("propertyId", propertyId);
    return this.getItem<EventMod[]>(this.controller + "GetPropertyEvents", httpParams)
  }
}
