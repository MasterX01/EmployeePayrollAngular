import { HttpService } from './../HttpService/http.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpService) { }

  addEmployee(data){
    this.http.Post('/add', data);
  }

  getAllEmployees(){
    return this.http.Get('/all');
  }
}
