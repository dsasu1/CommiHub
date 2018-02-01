import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { CommentcardComponent } from './commentcard.component';
import { CommentcardformComponent } from './form/commentcardform.component';
import { CommentcardlistsComponent } from './list/commentcardlists.component';
import { CommentCardService } from './service/commentcard.service';
import { CommentCardGuard } from './guards/commentcard.guard';
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

const routes: Routes = [

  { path: 'commentcard', component: CommentcardComponent, canActivate: [UserAuthenticationGuard], resolve: { propertyInfo: SelectedPropertyResolver }}
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
    CustompipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CommentcardComponent, CommentcardformComponent, CommentcardlistsComponent],
  providers: [CommentCardService, CommentCardGuard],
  exports: [RouterModule]

})
export class CommentcardModule { }
