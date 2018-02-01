import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationModule } from '../common/translation/translation.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AboutusComponent } from './company/aboutus.component';
import { PrivacypolicyComponent } from './company/privacypolicy.component';
import { CookiepolicyComponent } from './company/cookiepolicy.component';
import { UseragreementComponent } from './company/useragreement.component';
import { CommunityguidelinesComponent } from './company/communityguidelines.component';
import { HelpComponent } from './company/help.component';
import { SidebarsComponent } from './headerfooter/sidebars.component';
import { HeaderComponent } from './headerfooter/header.component';
import { AppmessagesModule } from './appmessages/appmessages.module';
import { GlobalmenuComponent } from './menus/globalmenu.component';
import { LeftmenuComponent } from './menus/leftmenu.component';
import { NotificationSharedModule} from '../notification/shared/notificationshared.module';





@NgModule({
  imports: [
    CommonModule, FormsModule, TranslateModule,
    NotificationSharedModule,
    AppmessagesModule, RouterModule,
    TranslationModule, HttpClientModule
  ],
  declarations: [
      AboutusComponent,
      PrivacypolicyComponent,
      CookiepolicyComponent,
      UseragreementComponent,
      CommunityguidelinesComponent,
    HelpComponent, HeaderComponent, SidebarsComponent,
    GlobalmenuComponent, 
    LeftmenuComponent

  ],
  exports: [HeaderComponent, SidebarsComponent,
    GlobalmenuComponent, LeftmenuComponent,
    AppmessagesModule,

    CommonModule,
    TranslateModule, 
    FormsModule,
    HttpClientModule]
})
export class SharedModule { }
