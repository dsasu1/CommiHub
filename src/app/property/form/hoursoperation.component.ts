import { Component, OnInit, Input } from '@angular/core';
import { Hour, PropertyInformation, HourVM } from '../model/property.model';
import { AppConstants } from '../../common/AppConstants';
import { ErrorMessage, MessageDetail } from '../../model/utility.model';
import { NgForm } from '@angular/forms';
import { AppsessionService } from '../../service/appsession.service';
import { PropertyService } from '../service/property.service';
import { UserSession } from '../../model/usersession.model';

@Component({
  selector: 'app-hoursoperation',
  templateUrl: './hoursoperation.component.html'
})
export class HoursoperationComponent implements OnInit {
  @Input() isDisplay: boolean = false;
  @Input() newProperty: PropertyInformation;
  haveSavedData: boolean = false;
  operateHours: Hour[];
  hoursInfoMsg: ErrorMessage = new ErrorMessage();
  currentUser: UserSession;
  isSubmitted: boolean = false;
  constructor(private appsession: AppsessionService, private propertySource: PropertyService) { }

  ngOnInit() {

    if (this.appsession.IsUserLoggedIn) {
      this.currentUser = this.appsession.CurrentUser;
    }


    if (this.newProperty == null) {

      return;
    }

    this.fillData();
   

  }


  onHoursSubmit(form: NgForm) {

    if (this.newProperty.isDemoAccount) {
      let message: MessageDetail = new MessageDetail();
      message.isInfo = true;
      message.isInfo = true;
      message.msg = this.appsession.getTranslated("DemoFunctionalityLimited");
      this.appsession.setGlobalHeaderMessage(message);
      return;
    }
    this.hoursInfoMsg.clear();

    if (form.valid) {
      this.isSubmitted = true;
      let hourVm: HourVM = new HourVM();
      hourVm.propertyInformationId = this.newProperty.id;
      hourVm.userId = this.currentUser.userVM.id;
      hourVm.hours = this.operateHours;
      this.propertySource.saveHour(hourVm).subscribe(
        data => {
          this.isSubmitted = false;
          this.appsession.setGlobalHeaderMessage();
          this.operateHours = data.hours;
       
          return;
        },
        error => {
          this.isSubmitted = false;
          let messages = this.appsession.getHttpErrorMessages(error);
          this.hoursInfoMsg.addRange(messages);
          return;
         }
      )
    }
  }

  onCancel(form: NgForm) {
  
    form.reset();
    this.fillData();
  }

  fillData() {
    this.propertySource.getPropertyHours(this.newProperty.id).subscribe(
      data => {

        if (data != null && data.hours.length > 0) {
          this.operateHours = data.hours;
          this.haveSavedData = true;
          return;
        }
      },
      error => {

        return;
      })

    this.operateHours = new Array<Hour>();

    for (var i = 0; i < AppConstants.Days.length; i++) {
      let hour = new Hour();
      hour.propertyInformationId = this.newProperty.id;
      hour.dayKey = AppConstants.Days[i];
      hour.closeTimeType = "pm";
      hour.openTimeType = "am";
      this.operateHours.push(hour);
    }
  }
}

