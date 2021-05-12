import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EmployeeService } from './../../services/EmployeeService/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  departments: string[] = ['HR', 'Sales', 'Finance', 'Engineer', 'Others'];
  checked: string[] = [];
  salary = '400000';
  form: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private empService: EmployeeService, private router: Router) { }

  ngOnInit(){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      profileImage: [],
      gender: ['', Validators.required],
      department: this.checked,
      salary: ['', Validators.required],
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      notes: ['']
    });
  }

  addDept(department){
    this.checked.push(department);
  }

  onSubmit(){
    if (this.form.valid){
      const requestObj = {
        department: this.checked,
        gender: this.form.value.gender,
        name: this.form.value.name,
        notes: this.form.value.notes,
        profileImage: this.form.value.profileImage,
        salary: this.form.value.salary,
        start: this.form.value.year + '-' + this.form.value.month + '-' + this.form.value.day
      };
      console.log(this.form.value);
      this.empService.addEmployee(requestObj).subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl('/home');
      }, (err) => {
        console.log(err);
      });

    }else{
      return;
    }

  }
}
