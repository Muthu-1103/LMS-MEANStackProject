import { Component } from '@angular/core';
export interface Staff {
  name: string;
  em_id: string;
  role: string;
  // Add more properties as needed
}
@Component({
  selector: 'app-profile-staff',
  standalone: true,
  imports: [],
  templateUrl: './profile-staff.component.html',
  styleUrl: './profile-staff.component.css'
})

export class ProfileStaffComponent {
  staff: Staff | null = null;
}
