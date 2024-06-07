import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-staff',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './log-staff.component.html',
  styleUrl: './log-staff.component.css'
})
export class LogStaffComponent {
  loginForm: FormGroup;
 

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,private router:Router,private authService:AuthService) {
    this.loginForm = this.formBuilder.group({
      em_id:'',
      ps:''
    });
} 
loginUserStaff() {
  if (this.loginForm.valid) {
    this.apiService.loginUserStaff(this.loginForm.value).subscribe(
      (response: any) => {
        console.log("User Logged successfully", response);
        alert("User Logged successfully");
        this.authService.login();
        this.router.navigate(["/homeStaff"],{ queryParams:{u_name: this.loginForm.value.em_id }});
        this.loginForm.reset();
      },
      (error: any) => {
        console.error("Error Logging user", error);
        let errorMessage = "An error occurred. Please try again.";
        if (error.status === 404) {
          errorMessage = "User not found. Please check your email.";
        } else if (error.status === 401) {
          errorMessage = "Password incorrect. Please try again.";
        }
        alert(errorMessage);
        this.loginForm.reset();
      }
    );
  } else {
    console.log("Form is invalid. Please check your inputs.");
    alert("Form is invalid. Please check your inputs.");
  }
}

}
