//Libraries
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Root component
import { AppComponent } from './app.component';



//Services
import { HttpHeadersInterceptor } from './common/intercerptorservice/HttpHeaders.Interceptor';
import { AppsessionService } from './service/appsession.service';
import {
  GlobalService,
  UsersService
} from './service/model.service';
import { UserAuthenticationGuard } from './service/UserAuthenticationGuard';


//Module
import { ManagementModule } from './management/management.module';
import { NotificationModule } from './notification/notification.module';
import { PropertypageModule } from './property/home/propertypage.module';
import { SelectedPropertyResolver } from './property/service/propertInfo.resolver';
import { ReviewService } from './review/service/review.service';
import { SettingModule } from './setting/setting.module';
import { SharedModule } from './sharedcomponents/shared.module';

//Routing
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from "./app.routing.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    SettingModule,
    PropertypageModule,
    ManagementModule,
    NotificationModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpHeadersInterceptor,
    multi: true,
  }, UsersService, GlobalService,
    AppsessionService, ReviewService,
    UserAuthenticationGuard, SelectedPropertyResolver

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


