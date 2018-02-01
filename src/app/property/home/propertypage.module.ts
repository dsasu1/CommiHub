import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { PropertyPageComponent } from './propertypage.component';
import { AboutinfoComponent} from './aboutinfo.component';
import { UserAuthenticationGuard } from '../../service/UserAuthenticationGuard';
import { PropertyService } from '../service/property.service';
import { SelectedPropertyResolver } from '../service/propertInfo.resolver';
import { ReviewinfoComponent } from '../../property/home/reviewinfo.component';

import { SharedhourModule } from '../shared/sharedhour.module';
import { CustompipesModule } from '../../common/pipes/custompipes.module';
import { ReviewsharedModule } from '../../review/reviewshared.module';
const routes: Routes = [
  {
    path: "property/:id", component: PropertyPageComponent, canActivate: [UserAuthenticationGuard], resolve: { propertyInfo: SelectedPropertyResolver },
    children: [
        { path: '', component: AboutinfoComponent, outlet: "section" },
        { path: 'aboutInfo', component: AboutinfoComponent, outlet: "section" },
        { path: 'reviewinfo', component: ReviewinfoComponent, outlet: "section" }

      ]
    }
]


@NgModule({
  imports: [
    SharedhourModule,
    CustompipesModule,
    ReviewsharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PropertyPageComponent, AboutinfoComponent, ReviewinfoComponent],
  providers: [PropertyService],
  exports: [RouterModule]
})
export class PropertypageModule { }
