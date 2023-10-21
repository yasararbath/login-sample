import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public sideNavState$: Subject<boolean> = new Subject();
  constructor(private apiService: ApiService,private router: Router,
    private toasterService: ToastrService) { }
  updateEmployee(id:string,employeeData:any):Observable<any>{
   return this.apiService
    .updateEmployee(id,employeeData)
  }
  
  deleteEmployee(id:string):Observable<any>{
   return this.apiService
    .deleteEmployee(id)
  }
  
  addEmployee(employeeData:any):Observable<any>{
    return this.apiService
    .saveEmployee(employeeData)
  }

  getAllEmployee():Observable<any>{
    return this.apiService
    .getAllEmployee()
  }
}
