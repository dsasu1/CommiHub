import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationlistComponent } from '../list/notificationlist.component';
import { TranslateModule } from '@ngx-translate/core';
import { ApppagerModule } from '../../sharedcomponents/paging/apppager.module';
import { CustompipesModule } from '../../common/pipes/custompipes.module';


@NgModule({
  imports: [
    CommonModule,
    ApppagerModule,
    CustompipesModule,
    TranslateModule
  ],
  declarations: [NotificationlistComponent],
  exports: [NotificationlistComponent, TranslateModule]
})
export class NotificationSharedModule { }
