import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private toastService: NgToastService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      emailPassword: ['']
    });
  }

  submit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const email = this.loginForm.get('email')?.value;
      const emailPassword = this.loginForm.get('emailPassword')?.value;
      
      this.authService.login(email, emailPassword)
        .subscribe(
          res => {
            // Successful login
            this.toastService.success({detail: "Login successful, welcome!", summary: "", duration: 3000});
            this.loginForm.reset();
            this.router.navigate(['/admin-list']);
          },
          error => {
            // Error handling for unsuccessful login
            this.errorMessage = "Login failed. Please check your credentials.";
            this.toastService.error({detail: this.errorMessage, summary: "", duration: 3000});
          }
        );
    }
  }  
}
