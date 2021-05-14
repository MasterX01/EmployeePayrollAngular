import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateComponent } from './../update/update.component';
import { EmployeeService } from './../../services/EmployeeService/employee.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  employeePayrollList: any;

  constructor(private empService: EmployeeService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEmployeePayrollData();
  }

  getEmployeePayrollData() {
    this.empService.getAllEmployees()
    .subscribe((result: any) => {
      console.log(result.obj);
      this.employeePayrollList = result.obj;
      console.log(this.employeePayrollList);
    });
  }

  delete(id){
    this.empService.deleteEmployee(id).subscribe((response) => {
      console.log(response, 'Deletion Successfull');
      this.getEmployeePayrollData();
    });
  }

  addNewEmployee(){
    console.log('redirecting now')
    this.router.navigateByUrl('/add');
  }

  update(employee){
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '100%',
      height: '100%',
      data: {employee}
    });
    // this.getEmployeePayrollData();
  }

}
