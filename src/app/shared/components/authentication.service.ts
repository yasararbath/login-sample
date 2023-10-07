import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenKey = 'token';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toasterService: ToastrService
  ) {}

  public login(email: string, password: string): void {
    this.apiService.login(email, password).subscribe({
      next:(res:any) => {
        if(res.statusCode=== 200){
          localStorage.setItem(this.tokenKey,res.data.token);
          this.router.navigate(['/dashboard']);
        }else{
         this.toasterService.error(res.data.error)
        }
    }
  });
  }

  public register(username: string, email: string, password: string): void {
    this.apiService
      .register(username, email, password)
      .subscribe({
        next:(res:any) => {
          if(res.statusCode=== 200){
           this.router.navigate(['/dashboard']);
          }else{
           this.toasterService.error(res.data.error)
          }
      }
    });
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}