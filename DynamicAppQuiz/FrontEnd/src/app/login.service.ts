// login.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private studentName = new BehaviorSubject<string>('');

  setStudentName(name: string) {
    this.studentName.next(name);
  }

  getStudentName() {
    return this.studentName.asObservable();
  }
}
