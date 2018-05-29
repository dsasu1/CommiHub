import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppsessionService} from '../../service/appsession.service';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const cloneRequest = req.clone({ setHeaders: { "ClientApi-key": environment.apikey, "APP-Name": environment.appName} });
    return next.handle(cloneRequest);
  }

}
