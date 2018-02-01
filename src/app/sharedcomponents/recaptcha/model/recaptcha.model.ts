export class RecaptchaResponse {
  constructor() { }
  success: boolean = false;
  challenge_ts: string;
  hostname: string;
}

export class RecaptchaRequest {
  constructor() {}
  secret: string;
  response: string;
}
