import { Directive, ElementRef, HostListener , Output, EventEmitter} from '@angular/core';
import swal from 'sweetalert2';
import { AppsessionService } from '../../service/appsession.service';

@Directive({
  selector: '[PSSweetAlert]'
})
export class PSSweetAlertDirective {
  @Output() onConfirm: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private appsession: AppsessionService) {

  }

  @HostListener("click") onClick() {
    swal({
      type: 'question',
      title: this.appsession.getTranslated("AreYouSure"), 
      text: this.appsession.getTranslated("YouWillNotRecover"),
      showCancelButton: true,    
      confirmButtonClass: 'btn btn-blue',
      cancelButtonClass: 'btn btn-secondary',
      confirmButtonText: this.appsession.getTranslated("Yes"),
      cancelButtonText: this.appsession.getTranslated("No")
    }).then((result) => {
      if (result.value) {
        this.onConfirm.emit(true);
      }    
    });
  }
}
