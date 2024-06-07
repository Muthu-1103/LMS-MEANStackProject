import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stafflist',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './stafflist.component.html',
  styleUrl: './stafflist.component.css'
})
export class StafflistComponent implements OnInit {
  users: User[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getStudents().subscribe(users => {
      this.users = users;
    });
  }
}
interface User {
  name: string;
  email: string;
}