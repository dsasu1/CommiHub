import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../../service/appsession.service';
import { PropertyInformation } from '../model/property.model';
import { PropertyService } from '../service/property.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-property',
  templateUrl: './propertypage.component.html'
})
export class PropertyPageComponent implements OnInit {
  selectedProperty: PropertyInformation = new PropertyInformation();
  coverimage: string;

    titleKey: string;
    constructor(private appsession: AppsessionService, private propsource: PropertyService, private route: Router, private activeRoute: ActivatedRoute) {
    }

    ngOnInit() {
      let code = this.activeRoute.snapshot.params['id'];

        if (this.appsession.selectedProperty != null) {
          this.selectedProperty = this.appsession.selectedProperty;
          this.titleKey = this.selectedProperty.propName;
   
           this.coverimage = this.appsession.getImageData(this.selectedProperty.coverOriginal, "image", "../../../assets/img/top-header1.jpg");
          
       
          this.appsession.SetAppTitle(this.titleKey);
        }


    }


}
