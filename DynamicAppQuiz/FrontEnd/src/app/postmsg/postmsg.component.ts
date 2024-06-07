import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router, ActivatedRoute } from '@angular/router';

interface msg{
  mesg: string;
}
@Component({
  selector: 'app-postmsg',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './postmsg.component.html',
  styleUrls: ['./postmsg.component.css']
})
export class PostmsgComponent {
  message: any = { staffName: '', studentName: '', mesg: '', timestamp: '' };
  errorMessage: string | undefined;
  constructor(private apiService: ApiService, private route: ActivatedRoute,private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.message.staffName = params['staff'];
      this.message.usernames = Array.isArray(params['usernames']) ? params['usernames'] : [params['usernames']];
      this.message.groupName=params['groupName']
    });
   }
  
   postMessage() {
    if (this.message.mesg.trim() === '') {
      this.errorMessage = 'Message cannot be blank';
      alert("Message shouldn't be blank")
      return;
    }
    
    this.errorMessage = ''; 
    this.message.timestamp = new Date().toLocaleString();
    this.apiService.addMessage(this.message).subscribe((response: any) => {
      console.log('Message sent successfully:', response);
      this.message = { staffName: this.message.staffName, usernames: [], mesg: '', timestamp: '' ,gname:this.message.groupName}; 
      alert("Message sent Successfully")
      
      this.router.navigate(['/homeStaff'],{ queryParams:{ u_name: this.message.staffName }});
    }, (error: any) => {
      console.error('Error sending message:', error);
    });
  }
}