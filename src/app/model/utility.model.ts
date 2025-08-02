import { Message } from 'primeng/api';

export class ErrorMessage {
  constructor() { }
  msgCssClass: string = "error";
  isGrowl: boolean = false;
  isSticky: boolean = false;
  lifeSpanInMilli: number = 3000;
  errorMessages: Message[] = new Array<Message>();

  clear() {
    this.isGrowl = false;
    this.lifeSpanInMilli = 3000;
    this.isSticky = false;
    this.msgCssClass = "error";
    this.errorMessages.length = 0;
  }

  add(message: string) {
    this.errorMessages.push({ severity: this.msgCssClass, summary: '', detail: message });
  }

  addRange(message: string[]) {

    for (let i = 0; i < message.length; i++) {
      this.errorMessages.push({ severity: this.msgCssClass, summary: '', detail: message[i] });
    }

  }

  isSuccessMessage() {
    this.msgCssClass = 'success';
  }

  isInfoMessage() {
    this.msgCssClass = 'info';
  }

  isErrorMessage() {
    this.msgCssClass = 'error';
  }


  isNotEmpty(): boolean {

    return this.errorMessages.length > 0;
  }

  getMessages(): Message[] {
    return this.errorMessages;
  }
}

export class MessageDetail {
  constructor() { }
  lifeSpanInMilli: number = 4000;
  isSticky: boolean = false;
  isInfo: boolean = false;
  msg: string = "Successful";
  isSuccess: boolean = true;
}




