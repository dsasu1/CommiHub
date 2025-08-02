import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { UserAuthenticationGuard } from '../service/UserAuthenticationGuard';
import { SharedModule } from '../sharedcomponents/shared.module';
import { CalendareventComponent } from './calendarevent.component';
import { EventsService } from './service/event.service';
import { ScheduleModule } from 'primeng/schedule';


const routes: Routes = [

  { path: "events", component: CalendareventComponent, canActivate: [UserAuthenticationGuard] }
]

@NgModule({
  imports: [
    ScheduleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CalendareventComponent],
  providers:[EventsService]
})
export class EventModule { }
