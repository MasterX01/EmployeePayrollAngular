import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { EmployeeService } from './../../services/EmployeeService/employee.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  name; profileImage; gender; salary; notes; day; month; year;
  departments: string[] = ['HR', 'Sales', 'Finance', 'Engineer', 'Others'];
  checked: string[] = [];
  dateArr: any[];
  convertedDate;
  form: FormGroup;
  submitted = false;
  constructor(public dialogRef: MatDialogRef<UpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private empService: EmployeeService,
              private formBuilder: FormBuilder) {
      this.form = formBuilder.group({
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
      this.name = data.employee.name;
      this.profileImage = data.employee.profileImage;
      this.gender = data.employee.gender;
      this.checked = data.employee.department;
      this.salary = data.employee.salary;
      this.notes = data.employee.notes;
      this.day = data.employee.start.split("-")[2];
      this.month = data.employee.start.split("-")[1];
      this.year = data.employee.start.split("-")[0];

    }

  ngOnInit(){
  }

  addDept(department){
    if (!this.checked.includes(department)){
      this.checked.push(department);
    }
  }

  onSubmit(){
    const reqObj = {
      department: this.checked,
      gender: this.form.value.gender,
      name: this.form.value.name,
      notes: this.form.value.notes,
      profileImage: this.form.value.profileImage,
      salary: this.form.value.salary,
      start: this.form.value.year + '-' + this.form.value.month + '-' + this.form.value.day
    };
    this.empService.updateEmployee(this.data.employee.id, reqObj).subscribe((response) => {
      console.log('Details Updated Successfully');
      console.log(response);
      this.dialogRef.close();
    });
  }
}
