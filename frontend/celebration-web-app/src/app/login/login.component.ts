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

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private toastService: NgToastService) { }

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
        .subscribe(res=>{
          this.toastService.success({detail: "SUCCESS", summary: "Enquiry Added", duration: 3000});
          this.loginForm.reset();
        })
    }
  }
}
