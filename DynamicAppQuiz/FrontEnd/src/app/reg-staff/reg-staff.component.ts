import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
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
@Component({
  selector: 'app-reg-staff',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './reg-staff.component.html',
  styleUrl: './reg-staff.component.css'
})
export class RegStaffComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,private router:Router) {
    this.registerForm = this.formBuilder.group({
      uname: ['', Validators.required],
      ps: ['', [Validators.required,passwordStrengthValidator(8)]],
      ph: ['', [Validators.required]],
      em_id: ['', [Validators.required, Validators.email]]
    });
  }
  registerUserStaff() {
    if (this.registerForm.valid) {
      this.apiService.registerUserStaff(this.registerForm.value).subscribe(
        (response:RegisterResponse) => {
          if (response.statusCode === 200) {
              console.log("User registered successfully", response);
              alert("User registered successfully");
              this.router.navigateByUrl('/log-staff');
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
    
        (        error: any) => {
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
