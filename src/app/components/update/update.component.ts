import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
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

  checkList: any[] = [];
  departments: string[];
  departmentList : Array<string> = ['HR', 'Sales', 'Finance', 'Engineer', 'Others'];
  selectedDepartments;
  departmentSelectionError = true;

  checked: string[] = [];
  dateArr: any[];
  convertedDate;
  form: FormGroup;
  submitted = false;
  constructor(public dialogRef: MatDialogRef<UpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private empService: EmployeeService,
              private formBuilder: FormBuilder,
              private router: Router) {
      this.form = formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        profileImage: [],
        gender: ['', Validators.required],
        salary: ['', Validators.required],
        day: ['', Validators.required],
        month: ['', Validators.required],
        year: ['', Validators.required],
        notes: [''],

        departments: this.addDepartmentControl(data.employee.department)
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

      this.departments = data.employee.departments;
      this.departmentSelectionError = false;

    }

  ngOnInit(){
  }

  // addDept(department){
  //   if (!this.checked.includes(department)){
  //     this.checked.push(department);
  //   }
  // }

  addDepartmentControl(depts){
  this.fillCheckList(depts)
   const arr = this.checkList.map(element=>{
     return this.formBuilder.control(element.checked);
   })
   return this.formBuilder.array(arr);
 }

 get departmentArray(){
   return <FormArray>this.form.get('departments');
 }

 getSelectedDepartmentValues(){
  this.selectedDepartments = [];
  this.departmentArray.controls.forEach((control, i)=>{
    if(control.value)
      this.selectedDepartments.push(this.departmentList[i]);
  });
  console.log(this.selectedDepartments);
  this.departmentSelectionError = this.selectedDepartments.length > 0 ? false : true;
}

fillCheckList(dept){
  for(let i = 0, j=0; i < this.departmentList.length; i++){
    if(j < dept.length){
      if(this.departmentList[i] == dept[j]){
        this.checkList.push({
          id : i,
          value: this.departmentList[i],
          checked: true
        });
        j++;
      }
      else {
          this.checkList.push({
            id : i,
            value: this.departmentList[i],
            checked: false
          });
        }
      }
      else{
        this.checkList.push({
            id : i,
            value: this.departmentList[i],
            checked: false
          });
      }
    }
}

  onSubmit(){
    const reqObj = {
      department: this.selectedDepartments,
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
      // this.router.navigateByUrl('home')
      this.dialogRef.close();
    });
  }

}
