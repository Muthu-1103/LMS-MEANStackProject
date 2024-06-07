import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import saveAs from 'file-saver';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-home-stud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-stud.component.html',
  styleUrl: './home-stud.component.css'
})
export class HomeStudComponent implements OnInit{
  messages: Message[] = [];
  constructor(private router:Router,private http:HttpClient,private loginService: LoginService,private route:ActivatedRoute,private apiService:ApiService,private authService:AuthService) {}
  u_name: string = '';
  hasQuizAssigned: boolean = false;
  userId: string='';
  filenames:string[] =[]; 
  groups:any[]=[];
  ngOnInit() {
     if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); // Redirect to login page
    }
    //this.fetchMessages();
    this.http.get<string[]>('http://localhost:4000/filenames')
      .subscribe(filenames => {
        this.filenames = filenames;
      });
    this.route.queryParams.subscribe(params => {
      this.u_name = params['u_name'];
      this.fetchMessages();
      
      this.getGroupsByStud(this.u_name).subscribe((groups) => {
        this.groups = groups;
      }, (error: any) => {
        console.error('Error fetching groups:', error);
        // Handle the error (e.g., show a message to the user)
      });
    }); 
  }
  downloadFile(filename: string): void {
    this.http.get(`http://localhost:4000/download/${filename}`).subscribe(() => {
    alert(`Downloading file: ${filename}`);
  });
  }
  attendQuiz(username: string): void {
    this.router.navigate(['/attend'], { queryParams: { username } });
  }
  navigateToAttendQuiz(groupName: string) {
    this.router.navigate(['/attend-quiz'], { queryParams: { groupName } });
  }
  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
    
      
    
  }
  navigateTo2(route: string, u_name: string): void {
    const queryParams = { u_name: u_name };
    this.router.navigate([route], { queryParams: queryParams });
  }
  navigateTo1(route: string): void {
    this.router.navigateByUrl(route);
    this.authService.logout();
     
    
  }
    getGroupsByStud(staffName: string): Observable<any[]> {
      const url = `http://localhost:4000/groups?u_name=${staffName}`;
      return this.http.get<any[]>(url);
    }
    getGroupsByUserId(userId: string): Observable<any[]> {
      const url = `http://localhost:4000/groups?userId=${userId}`;
      return this.http.get<any[]>(url);
    }
    fetchMessages() {
      console.log(this.u_name)
      this.apiService.getMessages(this.u_name).subscribe(
        (messages: any) => {
          this.messages = messages;
          
        },
        
        (error) => {
          console.error('Error fetching messages:', error);
        }
      );
    }
    
    downloadPdf(pdfId: string) {
      this.apiService.getPdf(pdfId).subscribe((data: Blob) => {
        const downloadURL = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'file.pdf';
        link.click();
      });
    }
    
}
 interface Message {
  _id: string;
  staffName: string;
  usernames: string[];
  mesg: string;
  timestamp: string;
  gname:string;
}
