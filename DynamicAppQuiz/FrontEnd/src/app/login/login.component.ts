import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authService:AuthService ,private formBuilder: FormBuilder, private apiService: ApiService,private router:Router,private loginService:LoginService) {
    this.loginForm = this.formBuilder.group({
      em_id:'',
      ps:''
    });
}
loginUser() {
  if (this.loginForm.valid) {
    this.apiService.loginUser(this.loginForm.value).subscribe(
      (response: any) => {
        console.log("User Logged successfully", response);
        alert("User Logged successfully");
        this.authService.login();
        
        this.router.navigate(["/homeStud"],{ queryParams:{ u_name: this.loginForm.value.em_id }});
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
