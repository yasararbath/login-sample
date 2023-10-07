import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private apiService: ApiService,private router: Router,
    private toasterService: ToastrService) { }
  updateEmployee(id:string,employeeData:any):Observable<any>{
   return this.apiService
    .updateEmployee(id,employeeData)
  }
  
  addEmployee(employeeData:any):Observable<any>{
    return this.apiService
    .saveEmployee(employeeData)
  }
}
