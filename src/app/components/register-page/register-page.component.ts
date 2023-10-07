import { AuthenticationService } from 'src/app/shared/components/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  public registerForm!: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]),
    });
  }
  getErrorMessage() {
    if (this.registerForm.get('email')?.hasError('required')) {
      return 'Email is required';
    }

    return this.registerForm.get('email')?.hasError('pattern') ? 'Enter a valid email' : '';
  }
  getPasswordError() {
    if (this.registerForm.get('password')?.hasError('required')) {
      return 'Password is required';
    }

    return this.registerForm.get('password')?.hasError('pattern') ? 'Password must contain more than 8 characters, 1 numeric, 1 upper case letter, and 1 special character($@$!%*?&)' : '';
  }

  public onSubmit() {
    this.authenticationService.register(
      this.registerForm.get('username')!.value,
      this.registerForm.get('email')!.value,
      this.registerForm!.get('password')!.value
    );
  }
}