import { EventModel } from '../models/event.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';
import { NGX_MAT_FILE_INPUT_CONFIG } from 'ngx-material-file-input';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  public packages = []

  eventForm!: FormGroup;
  selectedFile!: File;
  public userIdToUpdate!: number;
  public isUpdateActive: boolean = false;
  form: any;
  myform: any;

  toFormControl = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private api: ApiService, private toastService: NgToastService){

  }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      eventName: [''],
      company: [''],
      type: [''],
      to: this.toFormControl,
      bcc: [''],
      hour: [''],
      minute: [''],
      date: [''],
      imageFile: [''],
      textTemplate: [''],
    });
  
    // Configure the NGX_MAT_FILE_INPUT_CONFIG token
    const fileInputConfig = {
      sizeUnit: 'Octet'
    };
    providers: [{ provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: fileInputConfig }];

    this.activatedRoute.params.subscribe(val=>{
      this.userIdToUpdate = val['id'];
      this.api.getEventObjId(this.userIdToUpdate)
      .subscribe(res=>{
        this.isUpdateActive = true;
        this.fillFormToUpdate(res);
      });
    });
    
  }

  onImageFileSelected(event: any): void {
    console.log(event.files[0]);
    console.log("onImageFileSelected HERE");
    this.selectedFile = event.files[0];
  }

  submit(){
    
      console.log(this.eventForm.value);
      console.log(this.selectedFile);
      this.api.postEventObj(this.eventForm.value, this.selectedFile)
      .subscribe(res=>{
        this.toastService.success({detail: "SUCCESS", summary: "Enquiry Added", duration: 3000});
        this.eventForm.reset();
      })
    
  }

  /*
  submit(){
    if(this.eventForm.valid){
      console.log(this.eventForm.value);
      this.api.postEventObj(this.eventForm.value)
      .subscribe(res=>{
        this.toastService.success({detail: "SUCCESS", summary: "Enquiry Added", duration: 3000});
        this.eventForm.reset();
      })
    }
  }
  */

  update(){
    if(this.eventForm.valid){
      console.log(this.eventForm.value);
      this.api.updateEventObj(this.eventForm.value, this.userIdToUpdate)
      .subscribe(res=>{
        this.toastService.success({detail: "SUCCESS", summary: "Enquiry Updated", duration: 3000});
        this.eventForm.reset();
        this.router.navigate(['event-list']);
      })
    }
  }

  fillFormToUpdate(user: EventModel){
    this.eventForm.setValue({
      eventName: user.eventName,
      company: user.company,
      type: user.type,
      to: user.to,
      bcc: user.bcc,
      hour: user.hour,
      minute: user.minute,
      date: user.date,
      imageFile: user.imageFile,
      textTemplate: user.textTemplate,
      id: user.id
    });
  }

}
