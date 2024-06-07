import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-det',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-det.component.html',
  styleUrl: './group-det.component.css'
})
export class GroupDetComponent implements OnInit{
  groupMembers: string[] = [];
  myName:string='';
  groupName:string='';
  constructor(private apiService: ApiService, private route: ActivatedRoute,private router:Router) {}
  uploadPdf(): void {
    this.router.navigateByUrl('/upload-pdf');
  }
  navigateToPostMes(staff: string, usernames: string[],groupName:string) {
   
this.router.navigate(['/postmsg'], { queryParams:{ staff, usernames, groupName }});

  }
  assignQuiz(staff: string, usernames: string[],groupName:string) {
   
    this.router.navigate(['/quiz'], { queryParams:{ staff, usernames, groupName }});
    
      }
  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        const staffName = params['u_name'];
        const groupName = params['groupName'];
        this.groupName=params['groupName']
        this.myName=params['u_name'],
        console.log(staffName,groupName)
      this.apiService.getGroupMembers(staffName, groupName).subscribe(
        (groups: any[]) => {
          this.groupMembers = groups.flatMap(group => group.email);
        },
        (error) => {
          console.error(error);
          // Handle error
        }
      );
    });
  }
  }
  
