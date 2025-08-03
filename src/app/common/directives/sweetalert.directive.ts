import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { AppsessionService } from '../../service/appsession.service';

@Directive({
  selector: '[PSSweetAlert]'
})
export class PSSweetAlertDirective {
  @Output() onConfirm: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private appsession: AppsessionService) {

  }

  @HostListener("click") onClick() {
    Swal.fire({
      icon: 'question',
      title: this.appsession.getTranslated("AreYouSure"),
      text: this.appsession.getTranslated("YouWillNotRecover"),
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#6c757d',
      confirmButtonText: this.appsession.getTranslated("Yes"),
      cancelButtonText: this.appsession.getTranslated("No")
    }).then((result) => {
      if (result.isConfirmed) {
        this.onConfirm.emit(true);
      }
    });
  }
}
