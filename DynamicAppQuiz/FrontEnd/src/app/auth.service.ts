import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
/*  private LoggedIn = false;
  private isLoggedInKey = 'isLoggedIn';
  constructor(private http: HttpClient) {
    const storedLoggedIn = localStorage.getItem(this.isLoggedInKey);
    if (storedLoggedIn) {
      this.LoggedIn = JSON.parse(storedLoggedIn);
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>('http://localhost:4000/login', { username, password }).pipe(
      map(response => {
        if (response && response.token) {
          this.LoggedIn = true;
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => {
        return of(false);
      })
    );
  }
  
  isLoggedIn(): boolean {
    // Check if user is logged in by checking isLoggedIn flag
    return this.LoggedIn;
  }
  getCurrentUser(): User | null {
    // Retrieve user details from local storage
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      return JSON.parse(currentUserString);
    } else {
      return null;
    }
  }


  isStaff(): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser?.role === 'staff';
  }
  
}

interface User {
  id: string;
  username: string;
  role: 'staff' | 'student';
}
*/
private loggedIn = false;

  constructor(private http: HttpClient) {
    this.loggedIn = !!localStorage.getItem('loggedIn');
  }

  login(): void {
    this.loggedIn = true;
    localStorage.setItem('loggedIn', 'true');
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('loggedIn');
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }
}