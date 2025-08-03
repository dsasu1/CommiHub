import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AboutusComponent } from './sharedcomponents/company/aboutus.component';
import { CommunityguidelinesComponent } from './sharedcomponents/company/communityguidelines.component';
import { CookiepolicyComponent } from './sharedcomponents/company/cookiepolicy.component';
import { HelpComponent } from './sharedcomponents/company/help.component';
import { PrivacypolicyComponent } from './sharedcomponents/company/privacypolicy.component';
import { UseragreementComponent } from './sharedcomponents/company/useragreement.component';

import { UserAuthenticationGuard } from './service/UserAuthenticationGuard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "aboutus", component: AboutusComponent, canActivate: [UserAuthenticationGuard] },
  { path: "privacypolicy", component: PrivacypolicyComponent, canActivate: [UserAuthenticationGuard] },
  { path: "cookiepolicy", component: CookiepolicyComponent },
  { path: "useragreement", component: UseragreementComponent, canActivate: [UserAuthenticationGuard] },
  { path: "communityguide", component: CommunityguidelinesComponent },
  { path: "help", component: HelpComponent, canActivate: [UserAuthenticationGuard] },

  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'commentcard', loadChildren: () => import('./commentcard/commentcard.module').then(m => m.CommentcardModule) },
  { path: 'newsfeed', loadChildren: () => import('./news/news.module').then(m => m.NewsModule) },
  { path: 'servicerequest', loadChildren: () => import('./servicerequest/servicerequest.module').then(m => m.ServicerequestModule) },
  { path: 'reviews', loadChildren: () => import('./review/review.module').then(m => m.ReviewModule) },

  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
