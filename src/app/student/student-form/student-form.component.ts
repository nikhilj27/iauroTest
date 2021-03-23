import { HelperService } from './../../service/helper.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  submitted = false;
  studentData: any = null;
  studentList: any[] = [];
  currentIndex = 0;

  @ViewChild('formDirective')
  formDirective!: NgForm;

  constructor(private fb: FormBuilder, private helperService: HelperService) {
    this.studentForm = this.fb.group({
      fName: ['', [Validators.required]],
      lName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }

  // tslint:disable-next-line: typedef
  get f() {
    return this.studentForm.controls;
  }

  ngOnInit(): void {
    if (localStorage.getItem('data') !== null) {
      this.studentList = this.helperService.getData() as Array<any>;
    } else {
      this.studentList = [];
    }

    this.currentIndex = this.studentList.length;
  }

  public onFormSubmit(): void {
    this.submitted = true;
    if (this.studentForm.valid) {
      const data = {
        Id: this.currentIndex,
        fName: this.studentForm.value.fName,
        lName: this.studentForm.value.lName,
        email: this.studentForm.value.email,
        mobile: this.studentForm.value.mobile,
        address: this.studentForm.value.address,
        city: this.studentForm.value.city,
        state: this.studentForm.value.state,
        country: this.studentForm.value.country,
        gender: this.studentForm.value.gender,
      };

      this.studentData = data;
      this.resetForm();
    }
  }

  public resetForm(): void {
    this.formDirective.reset();
    this.submitted = false;
    this.studentList = this.helperService.getData() as Array<any>;
    this.currentIndex = this.studentList.length;
  }

  public setFormValue(data: any): void {
    this.currentIndex = data.Id;
    this.studentForm.patchValue({
      fName: data.fName,
      lName: data.lName,
      address: data.address,
      email: data.email,
      mobile: data.mobile,
      city: data.city,
      state: data.state,
      country: data.country,
      gender : data.gender
    });
  }
}
