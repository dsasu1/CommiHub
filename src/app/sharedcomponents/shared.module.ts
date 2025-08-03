import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationModule } from '../common/translation/translation.module';

import { NotificationSharedModule } from '../notification/shared/notificationshared.module';
import { AppmessagesModule } from './appmessages/appmessages.module';
import { AboutusComponent } from './company/aboutus.component';
import { CommunityguidelinesComponent } from './company/communityguidelines.component';
import { CookiepolicyComponent } from './company/cookiepolicy.component';
import { HelpComponent } from './company/help.component';
import { PrivacypolicyComponent } from './company/privacypolicy.component';
import { UseragreementComponent } from './company/useragreement.component';
import { HeaderComponent } from './headerfooter/header.component';
import { SidebarsComponent } from './headerfooter/sidebars.component';
import { MaterialModule } from './material/material.module';
import { GlobalmenuComponent } from './menus/globalmenu.component';
import { LeftmenuComponent } from './menus/leftmenu.component';

@NgModule({
    declarations: [
        AboutusComponent,
        PrivacypolicyComponent,
        CookiepolicyComponent,
        UseragreementComponent,
        CommunityguidelinesComponent,
        HelpComponent,
        HeaderComponent,
        SidebarsComponent,
        GlobalmenuComponent,
        LeftmenuComponent
    ],
    exports: [
        HeaderComponent,
        SidebarsComponent,
        GlobalmenuComponent,
        LeftmenuComponent,
        AppmessagesModule,
        CommonModule,
        TranslateModule,
        FormsModule,
        RouterModule,
        MaterialModule
    ],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        NotificationSharedModule,
        AppmessagesModule,
        RouterModule,
        TranslationModule,
        MaterialModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class SharedModule { }
