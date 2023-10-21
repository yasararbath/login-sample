import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';

import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/components/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isExpanded = false;
  showFiller = false;
  allEmployeeData: any;
  menuTypeBoolean: any;
  constructor(private router: Router, public dialog: MatDialog, private empService: EmployeeService, private toasterService: ToastrService) {
    this.getAllEmployee();
  }

  ngOnInit(): void {

  }

  menuType(event:any) {
    this.menuTypeBoolean = event;
    }

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  getAllEmployee() {
    this.empService.getAllEmployee()
      .subscribe({
        next: (res: any) => {
          if (res.statusCode === 200) {
            this.allEmployeeData = JSON.parse(JSON.stringify(res.data))
          } else {
            this.toasterService.error("Error in getting Employee Data")
          }
        },
        error: (err: any) => {
          console.log(err)
        },
      });
  }

  logout() {
    alert('Logged out successfully!');
    this.router.navigate(['/login']);
  }

  openFormDialog(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '400px', data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Form submitted:', result);
        // Add your logic to handle the form data here
      }
    });
  }
}
