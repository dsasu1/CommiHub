import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppsessionService } from '../../service/appsession.service';
import { ErrorMessage } from '../../model/utility.model';
import { UserSession } from '../../model/usersession.model';
import { AppConstants } from '../../common/AppConstants';
import { PropertyInformation, PropertyAccess, PropertyAccessForm } from '../model/property.model';
import { AvailableRole } from '../../role/model/role.model';
import { PropertyService } from '../service/property.service';

@Component({
  selector: 'app-role-properties',
  templateUrl: './role-properties.component.html'
})
export class RolePropertiesComponent implements OnInit, OnDestroy {
  InfoMsg: ErrorMessage = new ErrorMessage();
  propInfos: PropertyInformation[];
  dropDownLabel: string;
  role: AvailableRole;
  propForm: PropertyAccessForm = new PropertyAccessForm();
  isOpenForm: boolean = false;
  dropDownData: PropertyInformation[];
  private subscription: any;
  private subscriptionTwo: any;
  isSubmitted: boolean = false;
  constructor(private appsession: AppsessionService, private propSource: PropertyService) { }

  ngOnInit() {
    this.subscription = this.propSource.propInfoListChange.subscribe(value => {

      this.propInfos = value;

    });


     this.subscriptionTwo = this.propSource.propAccessListChange.subscribe(value => {
       if (this.propInfos != null) {
         if (value != null) {
           let availablePropData = Object.assign([],this.propInfos);

           for (let i = 0; i < value.length; i++) {
             availablePropData = availablePropData.filter(x => x.id != value[i].propertyInformationId);
                      
           }

           if (availablePropData != null && availablePropData.length > 0) {
             this.dropDownData = availablePropData;
           }
           
         }

        }

      });
    

     
    this.dropDownLabel = this.appsession.getTranslated(AppConstants.Select);
    this.role = <AvailableRole>this.appsession.editItem;
  }



  onSubmitForm(form: NgForm) {

    this.InfoMsg.clear();
    
    if (form.valid) {
      this.isSubmitted = true;
      this.propForm.roleId = this.role.id;
      this.propForm.userId = this.appsession.CurrentUser.userVM.id;
      this.propSource.saveRoleProperty(this.propForm).subscribe(data => {
        this.isSubmitted = false;
        this.propSource.loadPropertyAccess(this.appsession.CurrentUser.userVM.id, this.role.id);
        this.openForm(false);
      },
        error => {
          this.isSubmitted = false;
        }
      )
    }
  }

  openForm(open: boolean) {
    this.InfoMsg.clear();
    if (!open) {
      this.propForm = new PropertyAccessForm();
    }

    this.isOpenForm = open;
  }

  ngOnDestroy() {

    this.subscription.unsubscribe();
    this.subscriptionTwo.unsubscribe();
    
  }


}
