import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../service/BaseService';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PropertyInformation, PropertyType, PropertyAccess, HourVM, PropertyAccessForm, TenantUnit } from '../model/property.model';
import { Subject } from 'rxjs';

@Injectable()
export class PropertyService extends AbstractRestService {
  private controller: string = "property/";
  propInfoList: PropertyInformation[];
  isPropInforAlreadyLoaded: boolean = false;
  propInfoListChange: Subject<PropertyInformation[]> = new Subject<PropertyInformation[]>();
  propAccessListChange: Subject<PropertyAccess[]> = new Subject<PropertyAccess[]>();
  constructor(http: HttpClient) {
    super(http)

  }

  savePropertyInfo(propInfo: PropertyInformation) {
    return this.postItem<PropertyInformation>(this.controller + "SavePropertyInfo", propInfo);
  }

  saveHour(hr: HourVM) {
    return this.postItem<HourVM>(this.controller + "SaveHour", hr);
  }

  saveRoleProperty(prop: PropertyAccessForm) {
    return this.postItem<boolean>(this.controller + "SaveRoleProperty", prop);
  }

  saveTenantHome(newHome: TenantUnit) {
    return this.postItem<boolean>(this.controller + "SaveTenantHome", newHome);
  }


  getPropertyHours(propertyId: string) {
    let httpParam: HttpParams = new HttpParams().append("id", propertyId);
    return this.getItem<HourVM>(this.controller + "GetPropertyHours", httpParam);
  }

  getPropertyByUrl(urlName: string) {
    let httpParam: HttpParams = new HttpParams().append("id", urlName);
    return this.getItem<PropertyInformation>(this.controller + "GetPropertyByUrl", httpParam);
  }


  getUserProperties(userId: string) {
    let httpParam: HttpParams = new HttpParams().append("id", userId);
    return this.getItem<PropertyInformation[]>(this.controller + "GetUserProperties", httpParam);
  }

  getPropertyById(id: string) {
    let httpParam: HttpParams = new HttpParams().append("id", id);
    return this.getItem<PropertyInformation>(this.controller + "GetPropertyById", httpParam);
  }

  deleteProperty(userId: string, propertyId: string) {
    let httpParam: HttpParams = new HttpParams().append("propertyId", propertyId).append("userId", userId);
    return this.deleteItem<boolean>(this.controller + "DeleteProperty", httpParam);
  }

  deletePropertyAccess(userId: string, propertyId: string, roleId: string) {
    let httpParam: HttpParams = new HttpParams().append("propertyId", propertyId).append("userId", userId).append("roleId", roleId);
    return this.deleteItem<boolean>(this.controller + "DeletePropertyAccess", httpParam);
  }

  getPropertyAccess(userId: string, roleId: string) {
    let httpParam: HttpParams = new HttpParams().append("userId", userId).append("roleId", roleId);
    return this.getItem<PropertyAccess[]>(this.controller + "GetPropertyAccess", httpParam);
  }

  getPropertyTypes(){
    return this.getItem<PropertyType[]>(this.controller + "GetPropertyTypes");

  }

  loadUserProperties(userId: string) {
    this.getUserProperties(userId).subscribe(data => {
      this.isPropInforAlreadyLoaded = true;
      this.propInfoList = data;
      this.propInfoListChange.next(data);

    });
  }

  loadPropertyAccess(userId: string, roleId: string) {
    this.getPropertyAccess(userId, roleId).subscribe(data => {
      this.propAccessListChange.next(data);

    });
  }
 

}
