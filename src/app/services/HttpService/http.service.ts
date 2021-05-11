import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = environment.BaseUrl;

  constructor(private http: HttpClient) { }

  Get(url): Observable<any>{
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token'),

      })
    };
    return this.http.get<any>(this.baseUrl + url, options);
  }
  Update(){

  }
  Delete(){

  }
  Post(url, data){
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token'),

      })
    };
    this.http.post(this.baseUrl + url, data, options);
  }
}
