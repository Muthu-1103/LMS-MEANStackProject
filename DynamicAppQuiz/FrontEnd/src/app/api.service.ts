import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { saveAs } from "file-saver";
import { AuthService } from "./auth.service";
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = "http://localhost:4000";

    constructor(private httpClient: HttpClient,private AuthService:AuthService) { }

    registerUser(userDetails: any) {
        return this.httpClient.post(`${this.baseUrl}/register`, userDetails);
    }
    loginUser(userDetails: any) {
        return this.httpClient.post(`${this.baseUrl}/login`, userDetails);
    }
    registerUserStaff(userDetails: any) {
        return this.httpClient.post(`${this.baseUrl}/reg-staff`, userDetails);
    }
    loginUserStaff(userDetails: any) {
        return this.httpClient.post(`${this.baseUrl}/log-staff`, userDetails);
    }
    getUsers(): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.baseUrl}/users`);
    }
    createGroup(groupData: { staffName:string,groupName: string; users: { email: any; username: any; }[]; }): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}/groups`, groupData);
    }
    retrieveGroups(staffName: string) {
        const headers = new HttpHeaders().set('Staff-Name', staffName);
        return this.httpClient.get('/retrievegroups', { headers });
      }
      addMessage(message: any) {
        return this.httpClient.post(`${this.baseUrl}/mesg`, message);
      }
    
      getMessages(username: string) {
        return this.httpClient.get(`${this.baseUrl}/mesgretrieve?u_name=${username}`);
      }
      getAssignedQuizzesByUsername(username: string): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.baseUrl}/quizzes/assigned/${username}`);
      }
      
      getStudents(): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.baseUrl}/users`);
      }

    getUserGroups(staffName: string): Observable<any[]> {
        const headers = new HttpHeaders().set('staff-name', staffName);
        return this.httpClient.get<any[]>(`${this.baseUrl}/retrievegroups`, { headers });
      }
      getStaffDetails(id: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/log-staff/${id}`);
      }
      getFileNames() {
        return this.httpClient.get<string[]>(`${this.baseUrl}/files`);
      }
      getGroupMembers(staffName: string, groupName: string): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.baseUrl}/group-det?staffName=${staffName}&groupName=${groupName}`);
      }
      deleteGroup(u_name: string, gname: string): Observable<any> {
        return this.httpClient.delete<any>(`${this.baseUrl}/group/${u_name}/${gname}`);
      }
      
        getGroupByGroupNameAndUName(groupName: string, u_name: string): Observable<any> {
          return this.httpClient.get<any>(`${this.baseUrl}/group-det?u_name=${u_name}&groupName=${groupName}`);
        }
        getPdf(pdfId: string): Observable<Blob> {
          return this.httpClient.get('http://localhost:4000/' + pdfId, { responseType: 'blob' });
        }
      downloadFile(filename: string): Observable<Blob> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/pdf',
          // Add any other headers you need
        });
    
        return this.httpClient.get(`http://localhost:4000/files?/${filename}`, { responseType: 'blob', headers });
      }
      private apiUrl = 'http://localhost:4000/api/quiz';


      createQuiz(quizData: any): Observable<any> {
        return this.httpClient.post<any>(this.apiUrl, quizData);
      }
      getQuiz(groupName: string): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.baseUrl}?gname=${groupName}`);
      }
      getQuizData1(): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/api/quiz`);
      }
    
    
      submitQuiz(quizId: string, selectedOption: number): Observable<any> {
        return this.httpClient.post<any>(`${this.baseUrl}/submit-quiz`, { quizId, selectedOption });
      }
      checkQuizAssigned(u_name: string): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/check-quiz-assigned/${u_name}`);
      }
      getUsersByStaffName(staffName: string): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.baseUrl}/users/${staffName}`);
      }
      assignQuizToUsers(users: any[], quizId: string): Observable<any> {
        const assignments = users.map(user => ({
          userId: user._id,
          quizId: quizId,
          assignedDate: new Date()
        }));
    
        return this.httpClient.post<any>(`${this.baseUrl}/assign-quiz`, { assignments });
      }
      getUserDetails(){
        return this.httpClient.get<any>("http://localhost:4000/getuname");
      }
    
      updateUserName(newName: string){
        const data = {newName: newName};
        return this.httpClient.patch("http://localhost:4000/update", data);
      }
    
      changePassword(oldPass: string, newPass: string){
        const data = {oldPass: oldPass, newPass: newPass};
        return this.httpClient.patch("http://localhost:4000/updatepss", data);
      }

      updatePassword(username: string, newPassword: string) {
        // Assuming your API endpoint for updating password is '/api/updatePassword'
        return this.httpClient.post('http://localhost:4000/api/updatepassword', { username, newPassword });
      }
      updatePassword1(username: string, newPassword: string) {
        // Assuming your API endpoint for updating password is '/api/updatePassword'
        return this.httpClient.post('http://localhost:4000/api/updatepassword1', { username, newPassword });
      }
    }
  