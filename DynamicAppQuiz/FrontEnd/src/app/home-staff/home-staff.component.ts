import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { UploadService } from '../upload.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home-staff',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './home-staff.component.html',
  styleUrls: ['./home-staff.component.css']
})
export class HomeStaffComponent implements OnInit {
  uploadForm: FormGroup;
  pdfs:any;
  message: string | undefined;
  u_name: string = '';
  groupName: string = '';
  groups: any[] = [];
  selectedFile: File | null = null;
  @ViewChild('singleInput', { static: false })
  singleInput!: ElementRef;
  private routeSubscription: Subscription | null = null;
  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private uploadService: UploadService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService:AuthService
  ) {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
  }

  navigateTo(route: string) {

    this.router.navigateByUrl(route);
    this.authService.logout();
        
      
  }
  navigateTo3(route: string) {

    this.router.navigateByUrl(route);
  
        
      
  }
  navigateTo1(route:string,u_name:string,groupName:string)
  {
    
/*const secretKey='kumar';
  const encryptedUName = CryptoJS.AES.encrypt(u_name, secretKey).toString();
  const encryptedGroupName = CryptoJS.AES.encrypt(groupName, secretKey).toString();*/
    
    this.router.navigate([route], { queryParams: { u_name: u_name, groupName: groupName }   });

  
  }
  navigateTo2(route: string, u_name: string): void {
    const queryParams = { u_name: u_name };
    this.router.navigate([route], { queryParams: queryParams });
  }
    deleteGroup(u_name: string, gname: string): void {
      this.apiService.deleteGroup(u_name, gname).subscribe(
        () => {
          console.log('Group deleted successfully.');
          alert('Group deleted successfully');
          this.getGroupsByStaff(u_name);
          
          window.location.reload();
        },
        (error) => {
          console.error('Failed to delete group:', error);
          // Handle the error (e.g., display an error message)
        }
      );
    }
    
    
  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/log-staff']); // Redirect to login page
    }
    this.routeSubscription=this.route.queryParams.subscribe(params => {
      this.u_name = params['u_name'];
      this.getGroupsByStaff(this.u_name).subscribe(groups => {
        this.groups = groups;
      }, error => {
        console.error('Error fetching groups:', error);
        // Handle the error (e.g., show a message to the user)
      });
      
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    
      
    
  }
  
  fetchGroups() {
    this.http.get<any[]>('http://localhost:4000/retrievegroups').subscribe(groups => {
      this.groups = groups;
    });
  }
    getGroupsByStaff(staffName: string): Observable<any[]> {
    const url = `http://localhost:4000/groups?u_name=${staffName}`;
    return this.http.get<any[]>(url);
  }
  getGroupByGroupNameAndUName(groupName: string): void {
    console.log(groupName)
    this.apiService.getGroupByGroupNameAndUName(groupName, this.u_name)
      .subscribe((data: any) => {
        this.groups = data; // Assuming data is the group object
      });
  }
  selectPdf(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.pdfs = fileList[0];
      console.log(this.pdfs);
    }
  }  
  onSubmit(gname:string){
    if (!this.pdfs) {
      alert("No file selected");
      console.error('No file selected.');
      return;
    }
const formData=new FormData();
formData.append('file',this.pdfs)
console.log(gname);
formData.append('gname',gname);
console.log(formData.get('gname'))
  const url = `http://localhost:4000/upload`;
this.http.post<any>(url,formData).subscribe((res)=>{
  alert("File Uploaded Successfully")
  //this.singleInput.nativeElement.value=" ";
},
  err=>{
    console.log(err);
})

  }
}
