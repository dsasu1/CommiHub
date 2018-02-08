import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { UserAuthenticationGuard } from '../service/UserAuthenticationGuard';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import {
  InputTextModule,
  ToggleButtonModule, InputMaskModule
} from 'primeng/primeng';

import { AppmessagesModule } from '../sharedcomponents/appmessages/appmessages.module';
import { ApppagerModule } from '../sharedcomponents/paging/apppager.module';

import {ServicerequestsformComponent } from './form/servicerequestsform.component';
import { ServicerequestComponent } from './servicerequest.component';
import {ServicerequestfilterComponent } from './list/servicerequestfilter.component'
import { ServicerequestslistsComponent} from './list/servicerequestslists.component';
import {ServiceRequestGuard } from './guards/servicerequest.guard';
import { ServiceRequestService } from './service/servicerequest.service';
import { ProgressbarModule } from '../sharedcomponents/progressbar/progressbar.module';
import { SelectedPropertyResolver } from '../property/service/propertInfo.resolver';

import { CustompipesModule } from '../common/pipes/custompipes.module';

const routes: Routes = [

  { path: '', component: ServicerequestComponent, canActivate: [UserAuthenticationGuard], resolve: { propertyInfo: SelectedPropertyResolver } }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ApppagerModule,
    ToggleButtonModule,
    InputMaskModule,
    CustompipesModule,
    AppmessagesModule,
    ProgressbarModule,
     RouterModule.forChild(routes)
  ],
  declarations: [ServicerequestsformComponent, ServicerequestComponent, ServicerequestslistsComponent, ServicerequestfilterComponent],
  providers: [ServiceRequestService, ServiceRequestGuard],
  exports: [RouterModule]

})
export class ServicerequestModule { }
