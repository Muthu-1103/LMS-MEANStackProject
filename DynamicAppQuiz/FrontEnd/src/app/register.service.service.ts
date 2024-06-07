import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  private Url="http://localhost:4000/Submit";
  constructor(private http:HttpClient) { 

  }
  postData(data:any):Observable<any>{
    return this.http.post<any>(this.Url,data);
  }
}
