//Libraries
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

//Root component
import { AppComponent } from './app.component';



//Services
import {
  UsersService, GlobalService} from './service/model.service';
import { AppsessionService } from './service/appsession.service';
import { UserAuthenticationGuard } from './service/UserAuthenticationGuard';
import { HttpHeadersInterceptor} from './common/intercerptorservice/HttpHeaders.Interceptor';


//Module
import { SharedModule } from './sharedcomponents/shared.module';
import { HomeModule } from './home/home.module';
import { CommentcardModule } from './commentcard/commentcard.module';
import { ServicerequestModule } from './servicerequest/servicerequest.module';
import { ReviewModule } from './review/review.module';
import { SettingModule } from './setting/setting.module';
import { NewsModule } from './news/news.module';
import { ProfileModule } from './profile/profile.module';
import { EventModule } from './event/event.module';
import { NotificationModule } from './notification/notification.module'
import { PropertypageModule } from './property/home/propertypage.module';
import { ManagementModule } from './management/management.module';
import { SelectedPropertyResolver } from './property/service/propertInfo.resolver';


//Routing
import { AppRoutingModule } from "./app.routing.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule, HomeModule, CommentcardModule,
    ServicerequestModule,
    ReviewModule,
    SettingModule,
    NewsModule,
    ProfileModule,
    EventModule,
    PropertypageModule,
    ManagementModule,
    NotificationModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpHeadersInterceptor,
    multi: true,
  },UsersService, GlobalService,
     AppsessionService,
    UserAuthenticationGuard, SelectedPropertyResolver

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


