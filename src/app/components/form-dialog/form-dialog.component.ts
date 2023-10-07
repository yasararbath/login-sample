import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/components/employee.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent {
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private empService: EmployeeService,
    private dialogRef: MatDialogRef<FormDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['',Validators.required, Validators.pattern(this.emailPattern)],
      designation: ['', Validators.required],
      address: ['', Validators.required],
      workLocation: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  getErrorMessage() {
    if (this.empForm.get('email')?.hasError('required')) {
      return 'Email is required';
    }

    return this.empForm.get('email')?.hasError('pattern') ? 'Enter a valid email' : '';
  }

  onSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Employee details updated!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
              alert("Error while updating the employee!");
            },
          });
      } else {
        this.empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee added successfully!');
            this.empForm.reset();
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            alert("Error while adding the employee!");
          },
        });
      }
    }
  }

}
