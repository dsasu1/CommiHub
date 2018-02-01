import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../../service/appsession.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html'
})
export class PropertiesComponent implements OnInit {
  //  titleKey: string = "Properties";
    
    constructor(private appsession: AppsessionService) { }

    ngOnInit() {
     //   this.appsession.SetAppTitle(this.titleKey);

    }


}
