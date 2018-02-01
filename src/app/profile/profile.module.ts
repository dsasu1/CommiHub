import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { UserAuthenticationGuard } from '../service/UserAuthenticationGuard';
import { ProfileComponent } from '../profile/profile.component';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [

  { path: 'profile', component: ProfileComponent, canActivate: [UserAuthenticationGuard] }
]

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileComponent],
  exports: [RouterModule]

})
export class ProfileModule { }
