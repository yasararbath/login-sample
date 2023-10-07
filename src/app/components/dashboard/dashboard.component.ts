import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showFiller = false;
  constructor(private router: Router,public dialog: MatDialog) { }

  logout() {
    alert('Logged out successfully!');
    this.router.navigate(['/login']);
  }
  openFormDialog(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '400px',data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Form submitted:', result);
        // Add your logic to handle the form data here
      }
    });
  }
}
