import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/components/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(private authenticationService: AuthenticationService) {}
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]),
    });
  }

  getErrorMessage() {
    if (this.loginForm.get('email')?.hasError('required')) {
      return 'Email is required';
    }

    return this.loginForm.get('email')?.hasError('pattern') ? 'Enter a valid email' : '';
  }
  getPasswordError() {
    if (this.loginForm.get('password')?.hasError('required')) {
      return 'Password is required';
    }

    return this.loginForm.get('password')?.hasError('pattern') ? 'Password must contain more than 8 characters, 1 numeric, 1 upper case letter, and 1 special character($@$!%*?&)' : '';
  }
  
  public onSubmit() {
    this.authenticationService.login(
      this.loginForm.get('email')!.value,
      this.loginForm!.get('password')!.value
    );
  }
}