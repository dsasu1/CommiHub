import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { HomeModule } from './home/home.module';


import { AboutusComponent } from './sharedcomponents/company/aboutus.component';
import { PrivacypolicyComponent } from './sharedcomponents/company/privacypolicy.component';
import { CookiepolicyComponent } from './sharedcomponents/company/cookiepolicy.component';
import { UseragreementComponent } from './sharedcomponents/company/useragreement.component';
import { CommunityguidelinesComponent } from './sharedcomponents/company/communityguidelines.component';
import { HelpComponent } from './sharedcomponents/company/help.component';
//import { NotificationComponent } from './sharedcomponents/notification/notification.component';


import { UserAuthenticationGuard } from './service/UserAuthenticationGuard';


const routes: Routes = [


     { path: '', redirectTo: 'home', pathMatch: 'full' },
     { path: "aboutus", component: AboutusComponent, canActivate: [UserAuthenticationGuard]  },
     { path: "privacypolicy", component: PrivacypolicyComponent , canActivate: [UserAuthenticationGuard]},
    { path: "cookiepolicy", component: CookiepolicyComponent },
    { path: "useragreement", component: UseragreementComponent, canActivate: [UserAuthenticationGuard] },
    { path: "communityguide", component: CommunityguidelinesComponent },
    { path: "help", component: HelpComponent ,canActivate: [UserAuthenticationGuard]},
  

      // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
