import { Component, OnInit , Input, OnDestroy} from '@angular/core';
import { AppsessionService } from '../../service/appsession.service';
import { UserSession } from '../../model/usersession.model';
import { PropertyInformation } from '../../property/model/property.model';
import { Router } from '@angular/router';
import { PropertyService } from '../../property/service/property.service';
import { NotificationService } from '../../notification/service/notification.service';
@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html'
})
export class LeftmenuComponent implements OnInit, OnDestroy {
  @Input() iconsonly: boolean;

  userSession: UserSession;
  selectedProperty: PropertyInformation;
  userProperties: PropertyInformation[];
  subscription: any;
  subscriptionTwo: any;

  constructor(private appsession: AppsessionService, private route: Router, private propService: PropertyService) {}

  ngOnInit() {
    if (this.appsession.IsUserLoggedIn) {
      this.userSession = this.appsession.CurrentUser;
      this.selectedProperty = this.appsession.selectedProperty;
      this.userProperties = this.appsession.properties;

        this.subscription = this.propService.propInfoListChange.subscribe(value => {
          this.userProperties = Object.assign([], value);

          if (this.appsession.selectedProperty == null && this.userProperties != null && this.userProperties.length == 1) {
            this.appsession.setSelectedProperty(this.userProperties[0]);
          }
          else if (this.userProperties == null || (this.userProperties != null && this.userProperties.length < 1)) {
            let prop: PropertyInformation = null;
            this.selectedProperty = prop;
          }

        });

        this.subscriptionTwo = this.appsession.selectedPropertyChange.subscribe(value => {
          this.selectedProperty = Object.assign({}, value);

        });

      }

    }

  CloseLeftMenu()
  {
      this.appsession.OpenLeftMenu(false);
  }

  OpenLeftMenu() {
      this.appsession.OpenLeftMenu(true);
  }

  selectProperty(propertyInfo: PropertyInformation) {
    this.appsession.setSelectedProperty(propertyInfo);
    this.appsession.redirectToRoute();
  }

  hidePropertyLink(propertyInfo: PropertyInformation) {
    if (this.appsession.selectedProperty != null) {
     
      return propertyInfo.id == this.appsession.selectedProperty.id;
    }
    else {
      return false;
    }
   
  }

  ngOnDestroy() {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.subscriptionTwo) {
      this.subscriptionTwo.unsubscribe();
    }
  }

}
