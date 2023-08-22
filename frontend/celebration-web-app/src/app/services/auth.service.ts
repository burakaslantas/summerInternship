import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/auth'; // Replace with your backend API URL
  private readonly accessTokenKey = 'auth_access_token'; // Updated token key name

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    // Check if the user is authenticated on service initialization
    this.checkAuthentication();
  }

  private checkAuthentication() {
    const accessToken = this.getAccessToken(); // Updated method name
    if (accessToken) {
      // Check if the access token is valid (e.g., not expired) here if needed
      this.isAuthenticatedSubject.next(true);
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login(email: string, emailPassword: string): Observable<any> {
    const loginData = { email, emailPassword };

    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      // Assuming your backend returns an accessToken on successful login
      // Modify this part based on your actual API response
      map((response: { accessToken: string }) => { // Updated response property name
        const accessToken = response.accessToken; // Updated property name
        if (accessToken) {
          this.setAccessToken(accessToken); // Updated method name
          this.isAuthenticatedSubject.next(true);
        }
        return response;
      })
    );
  }

  logout(): void {
    // Remove the access token and reset the authentication status
    this.removeAccessToken(); // Updated method name
    this.isAuthenticatedSubject.next(false);
  }

  private setAccessToken(accessToken: string): void { // Updated method name
    localStorage.setItem(this.accessTokenKey, accessToken); // Updated key name
  }

  private getAccessToken(): string | null { // Updated method name
    return localStorage.getItem(this.accessTokenKey); // Updated key name
  }

  private removeAccessToken(): void { // Updated method name
    localStorage.removeItem(this.accessTokenKey); // Updated key name
  }
}
