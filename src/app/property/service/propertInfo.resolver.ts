
import {of as observableOf,  Observable } from 'rxjs';

import {map, catchError} from 'rxjs/operators';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { PropertyInformation } from '../model/property.model';
import { PropertyService } from './property.service';
import { AppsessionService } from '../../service/appsession.service';
import { UserTypeEnum } from '../../common/AppConstants';


@Injectable()
export class ManagePropertyInfoResolver  {
  constructor(private propSevice: PropertyService,  private appsession: AppsessionService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PropertyInformation> {
    let id = route.paramMap.get('id');
    let currentUser = this.appsession.getCurrentUser();
    if (currentUser != null) {

      if (this.appsession.selectedProperty != null && this.appsession.selectedProperty.id == id) {

        this.appsession.editItem = this.appsession.selectedProperty;
        return observableOf(this.appsession.selectedProperty);
      }
      else if (this.appsession.properties != null) {
        let propInfos = this.appsession.properties;

        if (propInfos != null && propInfos.length > 0) {
          let props = propInfos.filter(x => x.id == id);
          if (props.length > 0) {
            this.appsession.editItem = props[0];
            return observableOf(props[0]);
          }
          else {
            this.appsession.redirectToRoute(currentUser.noPropertyRedirectPage);
            return observableOf(null);
          }
        }
      }
      else {
        return this.propSevice.getUserProperties(currentUser.userVM.id).pipe(map(info => {

          if (info != null && info.length > 0) {
            let prop = info.filter(x => x.id == id);

            if (prop != null && prop.length > 0) {
              if (currentUser.userTypeEnum == UserTypeEnum[UserTypeEnum.Tenant]) {

                this.appsession.editItem = prop[0];
                this.appsession.setSelectedProperty(prop[0]);
                return prop[0];
              }
              else if (info != null && currentUser.managementId == prop[0].managementUserId) {
                this.appsession.editItem = prop[0];
                this.appsession.setSelectedProperty(prop[0]);
                return prop[0];
              }
            }
            this.appsession.redirectToRoute(currentUser.noPropertyRedirectPage);
            return null;

          }
          else {

            this.appsession.redirectToRoute(currentUser.noPropertyRedirectPage);
            return null;
          }


        }),catchError(() => {
 
          this.appsession.redirectToRoute(currentUser.noPropertyRedirectPage);
          return observableOf(null);
        }),);

      }

     
    }
    this.appsession.redirectToRoute();
    return observableOf(null);
    
  }

}



@Injectable()
export class SelectedPropertyResolver  {
  constructor(private propSevice: PropertyService,  private appsession: AppsessionService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PropertyInformation> {
    let currentUser = this.appsession.getCurrentUser();
    if (currentUser != null) {

      if (this.appsession.selectedProperty != null) {
        return observableOf(this.appsession.selectedProperty);
      }
      else if (this.propSevice.isPropInforAlreadyLoaded) {
        let propInfos = this.propSevice.propInfoList;

        if (propInfos != null && propInfos.length > 0) {
          this.appsession.setSelectedProperty(propInfos[0]);
          return observableOf(propInfos[0]);
        }
      }
      else {
        return this.propSevice.getUserProperties(currentUser.userVM.id).pipe(map(info => {
          if (info != null && info.length > 0) {
            this.propSevice.propInfoListChange.next(info);
            this.appsession.properties = info;
            this.appsession.setSelectedProperty(info[0]);
            return info[0];
          }
          else {

            //this.router.navigate([currentUser.noPropertyRedirectPage]);
            return null;
          }

        }),catchError(() => {
          this.appsession.redirectToRoute();
          return observableOf(null);
        }),);
      }

    }
    else {

      if (state.url.indexOf("/property/") != -1 ) {
        let id = route.paramMap.get('id');
        return this.propSevice.getPropertyByUrl(id).pipe(map(info => {
          if (info != null) {
            this.appsession.setSelectedProperty(info);
            return info;
          }
          else {
            this.appsession.redirectToRoute();
            return null;
          }

        }),catchError(() => {
          this.appsession.redirectToRoute();
          return observableOf(null);
        }),);
      }


    }

    this.appsession.redirectToRoute();
    return observableOf(null);

  }

}
