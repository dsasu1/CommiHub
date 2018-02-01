import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecaptchaRequest, RecaptchaResponse } from './model/recaptcha.model';
import { UsersService } from '../../service/model.service';

@Component({
  selector: 'app-recaptcha',
  templateUrl: './recaptcha.component.html',
  styles: []
})
export class RecaptchaComponent implements OnInit {
  @Output() onCaptchaVerified: EventEmitter<RecaptchaResponse> = new EventEmitter<RecaptchaResponse>();
  constructor(private userService: UsersService) { }

  ngOnInit() {
  }

  showResponse(response) {
    let req: RecaptchaRequest = new RecaptchaRequest();
    req.response = response.response;

    this.userService.verifyRecaptcha(req).subscribe(data => {
      this.onCaptchaVerified.emit(data);
    });

  }

  showExpire(event) {
    this.onCaptchaVerified.emit(new RecaptchaResponse());
  }
}
