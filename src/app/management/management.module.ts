import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ManagementGuard } from '../management/guards/management.guard';
import { SharedbasicformModule } from '../property/shared/sharedbasicform.module';
import { SharedhourModule } from '../property/shared/sharedhour.module';
import { UserAuthenticationGuard } from '../service/UserAuthenticationGuard';
import { AppmessagesModule } from '../sharedcomponents/appmessages/appmessages.module';
import { FileuploaderModule } from '../sharedcomponents/fileupload/fileuploader.module';
import { ApppagerModule } from '../sharedcomponents/paging/apppager.module';

import { PropEventsComponent } from '../event/prop-events.component';
import { PropertymanagementComponent } from '../management/propertymanagement.component';
import { PropMediaComponent } from '../media/prop-media.component';
import { PropPageComponent } from '../page/prop-page.component';
import { PropertylistsComponent } from '../property/list/propertylists.component';
import { EditInfoComponent } from '../property/manage/edit-info.component';
import { ManagepropertyComponent } from '../property/manage/manageproperty.component';
import { PropertiesComponent } from '../property/manage/properties.component';
import { PropResidentComponent } from '../property/tenant/manage/prop-resident.component';
import { PropSocialComponent } from '../social/prop-social.component';

import { RoleNotificationComponent } from '../notification/role-notification.component';
import { RolePagesComponent } from '../page/role-pages.component';
import { RolePropertiesComponent } from '../property/role/role-properties.component';
import { EditRoleComponent } from '../role/edit-role.component';
import { RoleformComponent } from '../role/form/roleform.component';
import { RolelistComponent } from '../role/list/rolelist.component';
import { ManageRoleComponent } from '../role/manage-role.component';
import { RolesComponent } from '../role/roles.component';
import { StaffFormComponent } from '../staff/form/staff-form.component';
import { StaffListComponent } from '../staff/list/staff-list.component';
import { RoleStaffsComponent } from '../staff/role-staffs.component';
import { StaffComponent } from '../staff/staff.component';

import { ManagePropertyInfoResolver } from '../property/service/propertInfo.resolver';
import { AvailableRoleResolver } from '../role/service/availablerole-resolver.service';
import { RolesService } from '../role/service/role.service';
import { ProgressbarModule } from '../sharedcomponents/progressbar/progressbar.module';
import { StaffsService } from '../staff/service/staff.service';

import { NewhomeFormComponent } from '../property/tenant/form/newhome-form.component';
import { HomesGuard } from '../property/tenant/guard/homes.guard';
import { ResidentsListComponent } from '../property/tenant/list/residents-list.component';
import { HomesComponent } from '../property/tenant/manage/homes.component';
import { ManagehomeComponent } from '../property/tenant/manage/managehome.component';
import { UnithouseComponent } from '../property/tenant/manage/unithouse.component';
import { MyhomesComponent } from '../property/tenant/myhomes.component';
import { ResidentsService } from '../property/tenant/service/residents.service';

import { CustomdirectiveModule } from '../common/directives/customdirective.module';



const routes: Routes = [
  {
    path: "manageproperty/:id", component: ManagepropertyComponent, canActivate: [UserAuthenticationGuard, ManagementGuard], /*canActivateChild: [UserAuthenticationGuard, ManagementGuard],*/
    resolve: { propertyInfo: ManagePropertyInfoResolver },
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
