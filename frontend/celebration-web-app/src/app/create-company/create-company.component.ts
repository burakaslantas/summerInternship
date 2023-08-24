import { CompanyModel } from '../models/company.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {
  public packages = []

  companyForm!: FormGroup;
  public userIdToUpdate!: number;
  public isUpdateActive: boolean = false;
  form: any;
  myform: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private api: ApiService, private toastService: NgToastService){

  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      // If the user is not authenticated, you can handle it as needed
      // For example, you can redirect them to the login page
      this.router.navigate(['/login']);
    }
    
    this.companyForm = this.fb.group({
      companyName: [''],
      companyFullName: [''],
      hrMail: [''],
      hrMailPassword: [''],
      aLiveToMail: [''],
      aLiveCcMail: [''],
      aLiveBccMail: [''],
      companyHrGroupMail: [''],
    });
    

    this.activatedRoute.params.subscribe(val=>{
      this.userIdToUpdate = val['id'];
      this.api.getCompanyObjId(this.userIdToUpdate)
      .subscribe(res=>{
        this.isUpdateActive = true;
        this.fillFormToUpdate(res);
      });
    });
    
  }

  submit(){
    if(this.companyForm.valid){
      console.log(this.companyForm.value);
      this.api.postCompanyObj(this.companyForm.value)
      .subscribe(res=>{
        this.toastService.success({detail: "SUCCESS", summary: "Enquiry Added", duration: 3000});
        this.companyForm.reset();
      })
    }
  }

  update(){
    if(this.companyForm.valid){
      console.log(this.companyForm.value);
      this.api.updateCompanyObj(this.companyForm.value, this.userIdToUpdate)
      .subscribe(res=>{
        this.toastService.success({detail: "SUCCESS", summary: "Enquiry Updated", duration: 3000});
        this.companyForm.reset();
        this.router.navigate(['company-list']);
      })
    }
  }

  fillFormToUpdate(user: CompanyModel){
    this.companyForm.setValue({
      companyName: user.companyName,
      companyFullName: user.companyFullName,
      hrMail: user.hrMail,
      hrMailPassword: user.hrMailPassword,
      aLiveToMail: user.aLiveToMail,
      aLiveCcMail: user.aLiveCcMail,
      aLiveBccMail: user.aLiveBccMail,
      companyHrGroupMail: user.companyHrGroupMail,
      id: user.id
    });
  }

}

