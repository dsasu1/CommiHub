import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './service/notification.service';
import { NotificationSharedModule } from './shared/notificationshared.module';
import { Routes, RouterModule } from "@angular/router";
import { UserAuthenticationGuard } from '../service/UserAuthenticationGuard';
import { SelectedPropertyResolver } from '../property/service/propertInfo.resolver';

const routes: Routes = [

  { path: 'notification', component: NotificationComponent, canActivate: [UserAuthenticationGuard], resolve: { propertyInfo: SelectedPropertyResolver }}
]


@NgModule({
  imports: [
    CommonModule,
    NotificationSharedModule,
     RouterModule.forChild(routes)
  ],
  declarations: [NotificationComponent],
  providers: [NotificationService]
})
export class NotificationModule { }
