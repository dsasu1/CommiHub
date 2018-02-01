import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { UserAuthenticationGuard } from '../service/UserAuthenticationGuard';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import {
  InputTextModule, PasswordModule,
  ToggleButtonModule
} from 'primeng/primeng';

import { AppmessagesModule } from '../sharedcomponents/appmessages/appmessages.module';
import { ApppagerModule } from '../sharedcomponents/paging/apppager.module';
import { FileuploaderModule } from '../sharedcomponents/fileupload/fileuploader.module';


import {ChangepasswordComponent } from './form/changepassword.component';
import { PersonalinfoComponent } from './form/personalinfo.component';
import { DeactivateaccountComponent } from './form/deactivateaccount.component';
import {SecurityComponent } from './form/security.component';
import {SettingComponent } from './setting.component';
import { ProgressbarModule } from '../sharedcomponents/progressbar/progressbar.module';


const routes: Routes = [
  {
    path: "settings", component: SettingComponent, canActivate: [UserAuthenticationGuard], canActivateChild: [UserAuthenticationGuard], children: [
            { path: '', component: PersonalinfoComponent, outlet: "section" },
            { path: "basics", component: PersonalinfoComponent, outlet: "section" },
            { path: "changepassword", component: ChangepasswordComponent, outlet: "section" },
            { path: "security", component: SecurityComponent, outlet: "section" },
            { path: "deactivateaccount", component: DeactivateaccountComponent, outlet: "section" }

          ]
    }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ApppagerModule,
    ToggleButtonModule,
    PasswordModule,
    InputTextModule,
    ProgressbarModule,
    AppmessagesModule,
    FileuploaderModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChangepasswordComponent, PersonalinfoComponent, SecurityComponent, SettingComponent, DeactivateaccountComponent],
  providers: [],
  exports: [RouterModule]
})
export class SettingModule { }
