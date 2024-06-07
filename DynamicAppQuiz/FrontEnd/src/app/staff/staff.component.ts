import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
interface User {
  id: number;
  name: string;
  email: string;
  selected: boolean;
}
interface Group{
  groupName: string;
  staffName:string;
}

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css'
})
export class StaffComponent implements OnInit {
  users: any[]=[];
  groups:any[]=[];
  constructor(private http:HttpClient,private userService: ApiService,private router:Router,private authService:AuthService) {}
  selectedUsers: User[] = [];

  
  group: Group = {
    groupName: "",
    staffName:""
  };
  createGroup(): void {
    const selectedUsers = this.users.filter(user => user.selected);
    if(this.group.staffName.length == 0 ||this.group.groupName.length == 0 || selectedUsers.length == 0){
      alert("Enter Group name and select students");
      return;
    }
    const groupData = {
      staffName:this.group.staffName,
      groupName: this.group.groupName,
      users: selectedUsers.map(user => ({ email: user.email, username: user.name }))
    };
    console.log(groupData)
    this.userService.createGroup(groupData).subscribe(
      response => {
        console.log('Group created successfully:', response);
        alert("Group Created Successfully");
  
        this.router.navigate(['/homeStaff'], { queryParams:{u_name: this.group.staffName } });
        this.users.forEach(user => user.selected = false);
      },
      error => {
        console.error('Error creating group:', error);
        // Handle error
      }
    );
  }
  
    ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      
    });
  }

}
