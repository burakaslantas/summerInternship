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

  isAuthenticated(): boolean {
    const accessToken = this.getAccessToken();
    return !!accessToken;
  }

  login(email: string, emailPassword: string): Observable<any> {
    const loginData = { email, emailPassword };

    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      // Assuming your backend returns an accessToken on successful login
      // Modify this part based on your actual API response
      map(response => { // Updated response property name
        console.log(response)
        const accessToken = response.data.accessToken; // Updated property name
        console.log(accessToken)
        if (accessToken) {
          this.setAccessToken(accessToken); // Updated method name
          this.isAuthenticatedSubject.next(true);
        }
        return response;
      })
    );
  }

  logout(): Observable<void> {
    // Remove the access token and reset the authentication status
    this.removeAccessToken();
    this.isAuthenticatedSubject.next(false);
    
    // Return an Observable with void (nothing to emit)
    return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }

  private setAccessToken(accessToken: string): void { // Updated method name
    localStorage.setItem(this.accessTokenKey, accessToken); // Updated key name
  }

  public getAccessToken(): string | null { // Updated method name
    return localStorage.getItem(this.accessTokenKey); // Updated key name
  }

  private removeAccessToken(): void { // Updated method name
    localStorage.removeItem(this.accessTokenKey); // Updated key name
  }
}
