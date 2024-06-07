import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router,RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
export function passwordStrengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.value;
    if (!password || password.length < minLength) {
      return { 'passwordStrength': { requiredLength: minLength, actualLength: password ? password.length : 0 } };
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    if (!(hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar)) {
      return { 'passwordStrength': true };
    }

    return null;
  };
}
function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const phoneNumber = control.value;
    const valid = /^\d{10}$/.test(phoneNumber);
    return valid ? null : { 'invalidPhoneNumber': true };
  };
}

function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.value;
    const valid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password);
    return valid ? null : { 'invalidPassword': true };
  };
}
@Component({
  selector: 'app-register',
  standalone:true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule,CommonModule]
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,private router:Router) {
    this.registerForm = this.formBuilder.group({
      uname: ['', Validators.required],
      ps: ['', [Validators.required,passwordStrengthValidator(8)]],
      ph: ['', Validators.required],
      em_id: ['', [Validators.required, Validators.email]],
    });
  }

  registerUser() {
    if (this.registerForm.valid) {
      this.apiService.registerUser(this.registerForm.value).subscribe(
        (response :
          RegisterResponse) => {
            if (response.statusCode === 200) {
                console.log("User registered successfully", response);
                alert("User registered successfully");
                this.router.navigateByUrl('/login');
            } else if (response.statusCode === 409) {
                console.error("User already exists", response);
                alert("User already exists");
                // Optionally, you can redirect to the login page here as well
                // this.router.navigateByUrl('/login');
            } else {
                console.error("Registration failed", response);
                alert("Registration failed. Please try again.");
                this.registerForm.reset();
            }
        },
      
        error => {
          console.error("Error registering user", error);
          alert("Error registering user");
          this.registerForm.reset();
        }
      );
    } else {
      alert("Form is invalid. Please check your inputs.");
    }
  }
}

interface RegisterResponse {
  statusCode?: number;
  message?: string;
}
