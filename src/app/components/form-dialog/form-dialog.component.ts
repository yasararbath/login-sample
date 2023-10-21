import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/components/employee.service';
import { ToastrService } from 'ngx-toastr';

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
    private toasterService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this.formBuilder.group({
      name: ['',[ Validators.required]],
      designation: ['',[ Validators.required]],
      email: ['',[Validators.required, Validators.pattern(this.emailPattern)]],
      address: ['',[ Validators.required]],
      worklocation: ['',[ Validators.required]],
      salary: ['',[ Validators.required]]
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
    if (!this.empForm.invalid) {
      if (this.data) {
        this.empService
          .updateEmployee(this.data._id, {id:this.data._id ,...this.empForm.value})
          .subscribe({
            next: (res: any) => {
              if(res.statusCode === 200){
                this.dialogRef.close(true);
                this.toasterService.success("Employee Data updated successfully")
               }else{
                this.toasterService.error("Error in updating Employee Data")
               }             
            },
            error: (err: any) => {
              console.log(err)
             },
          });
      } else {
        this.empService.addEmployee(this.empForm.value).subscribe({
          next: (res: any) => {
            if(res.statusCode === 200){
              this.empForm.reset();
              this.dialogRef.close(true);
              this.toasterService.success("Employee Data saved successfully")
             }else{
              this.toasterService.error("Error in Saving Employee Data")
             }
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

}
