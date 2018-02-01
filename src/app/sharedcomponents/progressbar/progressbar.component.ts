import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html'
})
export class ProgressbarComponent implements OnInit {
  @Input() isSpinner: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
