import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Import your authService
import { Router } from '@angular/router'; // Import Router to navigate to another route

@Component({
  selector: 'app-logout',
  template: `
    <div class="logout-container">
      <h2>Logging Out...</h2>
      <!-- You can add a loading spinner or message here if needed -->
    </div>
  `,
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.logout().subscribe(
      () => {
        // Logout successful
        // You can perform additional actions here if needed
        console.log('Logged out successfully');
        this.router.navigate(['/login']); // Redirect to the login page after logout
      },
      (error) => {
        // Handle any logout errors
        console.error('Logout failed', error);
      }
    );
  }
}
