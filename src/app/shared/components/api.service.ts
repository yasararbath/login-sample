import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public login(email: string, password: string) {
    return this.http.post<any>(
      environment.apiUrl + '/login',
      {
        email: email,
        password: password,
      }
    );
  }

  public register(
    username: string,
    email: string,
    password: string
  ) {
    return this.http.post<any>(
      environment.apiUrl + '/register',
      {
        name: username,
        email: email,
        password: password,
      }
    ).pipe(
      catchError((err) => {

        return (err);   
      })
    )
  }
  public updateEmployee( id:string,
    model:any
  ){
    return this.http.put<any>(
      environment.apiUrl + '/update-employee/'+ id,
      model
    ).pipe(
      catchError((err) => {

        return (err);   
      })
    )
  }
  public saveEmployee(
    model:any
  ) {
    return this.http.post<any>(
      environment.apiUrl + '/save-employee',
      model
    ).pipe(
      catchError((err) => {

        return (err);   
      })
    )
  }
}
