import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Subject } from "rxjs/Subject";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export abstract class AbstractRestService{
    private baseRestUrl: string = environment.apiUrl;

    constructor(protected http: HttpClient, endPointUrl?: string) {
        if (endPointUrl != null) {
            this.baseRestUrl = endPointUrl;
        }
    }

  
  getItem<Tresult>(url: string, data?: HttpParams): Observable<Tresult>{

      return this.http.get<Tresult>(this.baseRestUrl + url, {
          params: data
      })
      .catch(function (error) {
          if (error.error instanceof ProgressEvent) {

              return Promise.reject(`Network Error: ${error.statusText} (${error.status})`);
          }
          else {

              return Promise.reject(error.error);
          }

      })
  }

  postItem<Tresult>(url: string , body:any): Observable<Tresult> {
      return this.http.post<Tresult>(this.baseRestUrl + url, body).catch(function (error) {
          if (error.error instanceof ProgressEvent) {

              return Promise.reject(`Network Error: ${error.statusText} (${error.status})`);
          }
          else {

              return Promise.reject(error.error);
          }
     
        
    })
  }

  putItem<Tresult>(url: string, body: any): Observable<Tresult> {
      return this.http.put<Tresult>(this.baseRestUrl + url, body).catch(function (error) {
        if (error.error instanceof ProgressEvent) {

            return Promise.reject(`Network Error: ${error.statusText} (${error.status})`);
        }
        else {

            return Promise.reject(error.error);
        }

    })
  }

   deleteItem<Tresult>(url: string, data?: HttpParams): Observable<Tresult> {

       return this.http.delete<Tresult>(this.baseRestUrl + url, {
       params: data
    })
      .catch(function (error) {
          if (error.error instanceof ProgressEvent) {

              return Promise.reject(`Network Error: ${error.statusText} (${error.status})`);
          }
          else {

              return Promise.reject(error.error);
          }

      })
  }

 

}
