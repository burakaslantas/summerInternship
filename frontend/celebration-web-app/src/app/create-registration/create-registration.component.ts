import { AdminModel } from '../models/admin.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit {
  public packages = []

  registrationForm!: FormGroup;
  public userIdToUpdate!: number;
  public isUpdateActive: boolean = false;
  form: any;
  myform: any;

  emailFormControl = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private api: ApiService, private toastService: NgToastService){

  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      adminName: [''],
      company: [''],
      email: this.emailFormControl,
      emailPassword: [''],
    });

    this.activatedRoute.params.subscribe(val=>{
      this.userIdToUpdate = val['id'];
      this.api.getRegisteredUserId(this.userIdToUpdate)
      .subscribe(res=>{
        this.isUpdateActive = true;
        this.fillFormToUpdate(res);
      });
    });
    
  }

  submit(){
    if(this.registrationForm.valid){
      console.log(this.registrationForm.value);
      this.api.registerAuth(this.registrationForm.value)
      .subscribe(res=>{
        this.toastService.success({detail: "SUCCESS", summary: "Enquiry Added", duration: 3000});
        this.registrationForm.reset();
      })
    }
  }

  update(){
    if(this.registrationForm.valid){
      console.log(this.registrationForm.value);
      this.api.updateRegisterUser(this.registrationForm.value, this.userIdToUpdate)
      .subscribe(res=>{
        this.toastService.success({detail: "SUCCESS", summary: "Enquiry Updated", duration: 3000});
        this.registrationForm.reset();
        this.router.navigate(['admin-list']);
      })
    }
  }

  fillFormToUpdate(user: AdminModel){
    this.registrationForm.setValue({
      adminName: user.adminName,
      company: user.company,
      email: user.email,
      emailPassword: user.emailPassword,
      id: user.id
    });
  }

}
