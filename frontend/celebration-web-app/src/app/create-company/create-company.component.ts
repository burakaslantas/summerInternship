import { CompanyModel } from '../models/company.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';

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

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private api: ApiService, private toastService: NgToastService){

  }

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      companyName: [''],
      hrMail: [''],
      hrMailPassword: [''],
      aLiveToMail: [''],
      aLiveCcMail: [''],
      aLiveBccMail: [''],
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
        this.router.navigate(['admin-list']);
      })
    }
  }

  fillFormToUpdate(user: CompanyModel){
    this.companyForm.setValue({
      companyName: user.companyName,
      hrMail: user.hrMail,
      hrMailPassword: user.hrMailPassword,
      aLiveToMail: user.aLiveToMail,
      aLiveCcMail: user.aLiveCcMail,
      aLiveBccMail: user.aLiveBccMail,
      id: user.id
    });
  }

}

