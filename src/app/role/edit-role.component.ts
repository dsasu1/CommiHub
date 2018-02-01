import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../service/appsession.service';
import { AvailableRole } from './model/role.model';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html'
})
export class EditRoleComponent implements OnInit {

  availableRole: AvailableRole;

  constructor(private appsession: AppsessionService, private route: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.availableRole = Object.assign({}, <AvailableRole> this.appsession.editItem);
  }

}
