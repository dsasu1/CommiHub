import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppsessionService } from '../../service/appsession.service';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html'
})
export class PagerComponent implements OnInit {
  @Input() pageSize : number;
  @Input() dataList: any;
  @Output() onPaged: EventEmitter<any> = new EventEmitter();
  private pageNumber: number = 1;

  isShowPager: boolean = true;
  constructor(private appservice: AppsessionService  ) { }

  ngOnInit() {
    if (this.pageSize == null) {
      this.pageSize = this.appservice.defaultPageSize;
    }

    this.isShowPager = this.dataList.length > this.pageSize * this.pageNumber;
  }

  pageIt() {
    if (this.dataList != null) {
      this.pageNumber++;
      let list = this.appservice.paginate(this.dataList, this.pageSize, this.pageNumber);
      this.isShowPager = this.dataList.length > this.pageSize * this.pageNumber;
      this.onPaged.emit(list);
      
    }

   
  }

  

}
