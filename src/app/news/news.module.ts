import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { NewsfeedComponent } from './newsfeed.component';
import { NewsfeedformComponent } from './form/newsfeedform.component';
import { NewspostlistComponent } from './list/newspostlist.component';
import { NewsService } from './service/news.service';
import { NewsGuard } from './guards/news.guard';
import { UserAuthenticationGuard } from '../service/UserAuthenticationGuard';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import {
  InputTextModule, 
  ToggleButtonModule
} from 'primeng/primeng';

import { AppmessagesModule } from '../sharedcomponents/appmessages/appmessages.module';
import { ApppagerModule } from '../sharedcomponents/paging/apppager.module';
import { ProgressbarModule } from '../sharedcomponents/progressbar/progressbar.module';
import { SelectedPropertyResolver } from '../property/service/propertInfo.resolver';

import { CustompipesModule } from '../common/pipes/custompipes.module';
import { CustomdirectiveModule } from '../common/directives/customdirective.module';


const routes: Routes = [

  { path: 'newsfeed', component: NewsfeedComponent, canActivate: [UserAuthenticationGuard, NewsGuard], resolve: { propertyInfo: SelectedPropertyResolver } }
]


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ApppagerModule,
    ToggleButtonModule,
    AppmessagesModule,
    ProgressbarModule,
    CustomdirectiveModule,
    CustompipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewsfeedformComponent, NewspostlistComponent, NewsfeedComponent],
  providers: [NewsService, NewsGuard],
  exports: [RouterModule]
})
export class NewsModule { }
