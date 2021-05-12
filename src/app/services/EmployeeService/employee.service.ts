import { HttpService } from './../HttpService/http.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpService) { }

  addEmployee(data){
    return this.http.Post('add', data);
  }

  getAllEmployees(){
    return this.http.Get('all');
  }

  updateEmployee(id, data){
    return this.http.Update('update/' + id, data);
  }

  deleteEmployee(id){
    return this.http.Delete('delete/' + id);
  }

}
