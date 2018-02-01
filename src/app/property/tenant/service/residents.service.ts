import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../service/BaseService';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResidentsVM, ResidencyStatusVM } from '../model/residents.model';
import { Subject , Observable } from 'rxjs';

@Injectable()
export class ResidentsService extends AbstractRestService {
  private controller: string = "residents/";
  residentsList: ResidentsVM[];
  residentsListChange: Subject<ResidentsVM[]> = new Subject<ResidentsVM[]>();
  constructor(http: HttpClient) {
    super(http)

  }

  getResidents(userId: string, propertyInfoId: string) {
    let httpParam: HttpParams = new HttpParams().append("propertyInformationId", propertyInfoId).append("userId", userId);
    return this.getItem<ResidentsVM[]>(this.controller + "GetResidents", httpParam);
  }

  saveResidencyStatus(residentStat: ResidencyStatusVM) {
    return this.putItem<boolean>(this.controller + "SaveResidencyStatus", residentStat);
  }


  loadResidents(userId: string, propertyInfoId: string) {
    this.getResidents(userId, propertyInfoId).subscribe(data => {
      this.residentsList = data;
      this.residentsListChange.next(data);

    });
  }

  hasValidResidency(userId: string, propertyInfoId: string): Observable<boolean> {

     return this.getResidents(userId, propertyInfoId).map(data => {

     if (data != null) {

       let residents = data.filter(x => x.isApproved == true && !x.isMovedOut)

       return residents != null && residents.length > 0;
     }

     return false;

    });
  }

  hasValidOrPreviousResidency(userId: string, propertyInfoId: string): Observable<boolean> {

    return this.getResidents(userId, propertyInfoId).map(data => {

      if (data != null) {

        let residents = data.filter(x => x.isApproved == true && (!x.isMovedOut || x.isMovedOut))

        return residents != null && residents.length > 0;
      }

      return false;

    });
  }




}
