import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/shared/components/employee.service';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { ToastrService } from 'ngx-toastr';
export interface EmployeeModel {
  name: string;
  designation: string;
  email: string;
  salary: number;
  address: string;
  worklocation: string;
}

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss']
})
export class ListTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'designation', 'email', 'salary', 'address', 'worklocation', 'edit' ,'delete'];
  @Input() allEmployeeData: any= [];
  optionValue: string;
  options: any = [
    { value: 'edit', viewValue: 'Edit' },
    { value: 'delete', viewValue: 'Delete' }
  ];

  constructor(public dialog: MatDialog, private empService: EmployeeService, private toasterService: ToastrService) {

  }

    ngOnInit(): void {
  }

  editEmployee(employeeData: any) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '400px', data: employeeData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Form submitted:', result);
      }
    });
  }

  deleteEmployee(employeeData: any) {
    this.empService.deleteEmployee(employeeData._id).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this.toasterService.success("Employee Data deleted successfuly")
        } else {
          this.toasterService.error("Error in Deleting Employee Data")
        }
      },
      error: (err: any) => {
        console.log(err)
      },
    });
  }
}
