import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import {
  PasswordModule, InputTextModule,
  ToggleButtonModule
} from 'primeng/primeng';

import { AppmessagesModule } from '../sharedcomponents/appmessages/appmessages.module';
import { ProgressbarModule } from '../sharedcomponents/progressbar/progressbar.module';
import { RecaptchaModule} from '../sharedcomponents/recaptcha/recaptcha.module';

import { HomelandingcontentComponent } from '../home/content/homelandingcontent.component';
import { LandinghomeComponent } from '../home/content/landinghome.component';
import { AccountconfirmComponent } from '../home/account/accountconfirm.component';
import { RegistersuccessComponent } from '../home/account/registersuccess.component';
import { ForgotaccountComponent } from '../home/account/form/forgotaccount.component';
import { NewpasswordComponent } from '../home/account/form/newpassword.component';
import { RegisterloginformComponent } from '../home/account/form/registerloginform.component';

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
    RecaptchaModule,
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
