import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-staff1',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './staff1.component.html',
  styleUrl: './staff1.component.css'
})
export class Staff1Component {
  users: User[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
interface User {
  name: string;
  email: string;
}
