import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { UserAuthenticationGuard } from '../service/UserAuthenticationGuard';
import { AppmessagesModule } from '../sharedcomponents/appmessages/appmessages.module';
import { ApppagerModule } from '../sharedcomponents/paging/apppager.module';
import { FileuploaderModule } from '../sharedcomponents/fileupload/fileuploader.module';
import {
  InputTextModule,
  InputSwitchModule,
  MultiSelectModule,
  ChipsModule,
  InputMaskModule,
  CalendarModule,
  ToggleButtonModule
} from 'primeng/primeng';
import { SharedhourModule } from '../property/shared/sharedhour.module';
import { SharedbasicformModule } from '../property/shared/sharedbasicform.module';
import { ManagementGuard } from '../management/guards/management.guard';

import { ManagepropertyComponent } from '../property/manage/manageproperty.component';
import { EditInfoComponent } from '../property/manage/edit-info.component';
import { PropSocialComponent } from '../social/prop-social.component';
import { PropMediaComponent } from '../media/prop-media.component';
import { PropPageComponent } from '../page/prop-page.component';
import { PropEventsComponent } from '../event/prop-events.component';
import { PropResidentComponent } from '../property/tenant/manage/prop-resident.component';
import { PropertiesComponent } from '../property/manage/properties.component';
import { PropertymanagementComponent } from '../management/propertymanagement.component';
import { PropertylistsComponent } from '../property/list/propertylists.component';

import { RolesComponent } from '../role/roles.component';
import { RoleformComponent } from '../role/form/roleform.component';
import { RolelistComponent } from '../role/list/rolelist.component';
import { StaffComponent } from '../staff/staff.component';
import { StaffFormComponent } from '../staff/form/staff-form.component';
import { StaffListComponent } from '../staff/list/staff-list.component';
import { ManageRoleComponent } from '../role/manage-role.component';
import { EditRoleComponent } from '../role/edit-role.component';
import { RoleNotificationComponent } from '../notification/role-notification.component';
import { RolePagesComponent } from '../page/role-pages.component';
import { RolePropertiesComponent } from '../property/role/role-properties.component';
import { RoleStaffsComponent } from '../staff/role-staffs.component';

import { RolesService } from '../role/service/role.service';
import { AvailableRoleResolver } from '../role/service/availablerole-resolver.service';
import { StaffsService } from '../staff/service/staff.service';
import { ProgressbarModule } from '../sharedcomponents/progressbar/progressbar.module';
import { ManagePropertyInfoResolver } from '../property/service/propertInfo.resolver';

import { MyhomesComponent } from '../property/tenant/myhomes.component';
import { ManagehomeComponent } from '../property/tenant/manage/managehome.component';
import { NewhomeFormComponent } from '../property/tenant/form/newhome-form.component';
import { HomesComponent } from '../property/tenant/manage/homes.component';
import { UnithouseComponent } from '../property/tenant/manage/unithouse.component';
import { HomesGuard } from '../property/tenant/guard/homes.guard'
import { ResidentsService } from '../property/tenant/service/residents.service';
import { ResidentsListComponent } from '../property/tenant/list/residents-list.component';

import { CustomdirectiveModule } from '../common/directives/customdirective.module';



const routes: Routes = [
  {
    path: "manageproperty/:id", component: ManagepropertyComponent, canActivate: [UserAuthenticationGuard, ManagementGuard], /*canActivateChild: [UserAuthenticationGuard, ManagementGuard],*/
    resolve: { propertyInfo: ManagePropertyInfoResolver},
    children: [{ path: '', component: EditInfoComponent, outlet: "section" },
    { path: 'editInfo', component: EditInfoComponent, outlet: "section" },
    { path: 'residents', component: PropResidentComponent, outlet: "section" },
    { path: 'media', component: PropMediaComponent, outlet: "section" },
    { path: 'events', component: PropEventsComponent, outlet: "section" },
    { path: 'pages', component: PropPageComponent, outlet: "section" },
    { path: 'social', component: PropSocialComponent, outlet: "section" }


    ]
  },

  {
    path: "management", component: PropertymanagementComponent, canActivate: [UserAuthenticationGuard, ManagementGuard], /*canActivateChild: [UserAuthenticationGuard, ManagementGuard],*/
    children: [
        { path: '', component: PropertiesComponent, outlet: "section" },
        { path: 'properties', component: PropertiesComponent, outlet: "section" },
        { path: 'roles', component: RolesComponent, outlet: "section" },
        { path: 'staff', component: StaffComponent, outlet: "section" }
    ]
  },
  {
    path: "managerole/:id", component: ManageRoleComponent, canActivate: [UserAuthenticationGuard, ManagementGuard], /*canActivateChild: [UserAuthenticationGuard, ManagementGuard],*/
    resolve: {
      role: AvailableRoleResolver   
    },
    children: [{ path: '', component: EditRoleComponent, outlet: "section" },
    { path: 'editInfo', component: EditRoleComponent, outlet: "section" },
    { path: 'pages', component: RolePagesComponent, outlet: "section" },
    { path: 'staffs', component: RoleStaffsComponent, outlet: "section" },
    { path: 'properties', component: RolePropertiesComponent, outlet: "section" },
    { path: 'notifications', component: RoleNotificationComponent, outlet: "section" }

    ]
  },

  {
    path: "myhomes", component: MyhomesComponent, canActivate: [UserAuthenticationGuard, HomesGuard],/* canActivateChild: [UserAuthenticationGuard, HomesGuard],*/
    children: [
      { path: '', component: HomesComponent, outlet: "section" },
      { path: 'homes', component: HomesComponent, outlet: "section" }
    ]
  },

  {
    path: "managehome/:id", component: ManagehomeComponent, canActivate: [UserAuthenticationGuard, HomesGuard], /*canActivateChild: [UserAuthenticationGuard, HomesGuard],*/
    resolve: { propertyInfo: ManagePropertyInfoResolver },
    children: [
      { path: '', component: PropResidentComponent, outlet: "section" },
      { path: 'units', component: PropResidentComponent, outlet: "section" }
    ]
  }


]

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    SharedhourModule,
    SharedbasicformModule,
    InputSwitchModule,
    MultiSelectModule,
    AppmessagesModule,
    ChipsModule,
    FileuploaderModule,
    InputMaskModule,
    CalendarModule,
    ProgressbarModule,
    ToggleButtonModule,
    ApppagerModule,
    CustomdirectiveModule,
    FormsModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManagepropertyComponent, EditInfoComponent,
    PropSocialComponent, PropMediaComponent, PropPageComponent,
    PropEventsComponent, PropResidentComponent, PropertymanagementComponent,
    RolesComponent, 
    RoleformComponent, RolelistComponent,
    StaffComponent, StaffFormComponent,
    StaffListComponent, ManageRoleComponent,
    EditRoleComponent, RoleNotificationComponent,
    RolePagesComponent, RolePropertiesComponent,
    RoleStaffsComponent, PropertiesComponent, PropertylistsComponent,
    MyhomesComponent, NewhomeFormComponent, HomesComponent, ManagehomeComponent,
    UnithouseComponent, ResidentsListComponent],
  providers: [RolesService, StaffsService, ManagementGuard, AvailableRoleResolver, ManagePropertyInfoResolver, HomesGuard, ResidentsService],
  exports: [RouterModule]
})
export class ManagementModule { }
