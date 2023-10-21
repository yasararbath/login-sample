import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/components/authentication.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Output() DashboardEmitter = new EventEmitter<any>();
  constructor(private authenticationService : AuthenticationService){

  }
  isOpen = false;

  toggleDrawer() {
    this.isOpen = !this.isOpen;
    this.DashboardEmitter.emit(this.isOpen);
  }
  logout(){
    this.authenticationService.logout()
  }
}
