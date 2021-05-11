import { EmployeeService } from './../../services/EmployeeService/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  salary = '40000';
  form: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private empService: EmployeeService) { }

  ngOnInit(){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      profile: [],
      gender: ['', Validators.required],
      department: ['', Validators.required],
      salary: ['', Validators.required],
      // date:[new Date(), Validators.required],
      // StartDate: [new Date(), Validators.required],
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      notes: ['']
    });
  }


  onSubmit(){
    if (this.form.valid){
      console.log(this.form.value);
      this.empService.addEmployee(this.form.value);
    }else{
      return;
    }

  }
}
