import { Component } from '@angular/core';
import { AppsessionService } from './service/appsession.service'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'

})
export class AppComponent {
 
    constructor(private appsession: AppsessionService) {


    }

    ngOnInit() {
        this.appsession.setTranslateDefault();
        }
 
}
