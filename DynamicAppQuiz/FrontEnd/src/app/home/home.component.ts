import { Component } from '@angular/core';
import {Router,RouterOutlet} from '@angular/router'
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
selectedUserType: string = 'student'; // Default value

  constructor(private router:Router) {}

  navLogin(userType: string) {
    if(userType==='student')
      {
        this.router.navigateByUrl('login')
      }
      else{
        this.router.navigateByUrl('log-staff')
      }
  }

  navRegister(userType: string) {
    if(userType==='student')
      {
        this.router.navigateByUrl('register')
      }
      else{
        this.router.navigateByUrl('reg-staff')
      }
}
}