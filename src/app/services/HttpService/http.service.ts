import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  baseUrl = environment.BaseUrl;

  constructor(private http: HttpClient) { }

  Get(url){
    return this.http.get(this.baseUrl + url, this.options);
  }
  Update(url,data){
    return this.http.put(this.baseUrl + url, data, this.options);
  }
  Delete(url){
    return this.http.delete(this.baseUrl + url);
  }
  Post(url, data){
    return this.http.post(this.baseUrl + url, data, this.options);
  }
}
