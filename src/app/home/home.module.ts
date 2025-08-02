import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { AppmessagesModule } from '../sharedcomponents/appmessages/appmessages.module';
import { ProgressbarModule } from '../sharedcomponents/progressbar/progressbar.module';


import { AccountconfirmComponent } from '../home/account/accountconfirm.component';
import { ForgotaccountComponent } from '../home/account/form/forgotaccount.component';
import { NewpasswordComponent } from '../home/account/form/newpassword.component';
import { RegisterloginformComponent } from '../home/account/form/registerloginform.component';
import { RegistersuccessComponent } from '../home/account/registersuccess.component';
import { HomelandingcontentComponent } from '../home/content/homelandingcontent.component';
import { LandinghomeComponent } from '../home/content/landinghome.component';

const routes: Routes = [
  { path: "newpassword/:id", component: NewpasswordComponent },
  { path: "accountconfirm/:id", component: AccountconfirmComponent },
  { path: "forgotaccount", component: ForgotaccountComponent },
  { path: "registersuccess", component: RegistersuccessComponent },
  { path: "home", component: LandinghomeComponent }
]

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AppmessagesModule,

    FormsModule,
    ProgressbarModule,
    PasswordModule, InputTextModule,
    ToggleButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterloginformComponent, LandinghomeComponent, ForgotaccountComponent, HomelandingcontentComponent, AccountconfirmComponent, RegistersuccessComponent, NewpasswordComponent],
  exports: [RouterModule]
})
export class HomeModule { }
