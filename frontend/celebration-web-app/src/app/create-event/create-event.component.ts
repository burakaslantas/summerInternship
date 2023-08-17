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
  public userIdToUpdate!: number;
  public isUpdateActive: boolean = false;
  form: any;
  myform: any;

  toFormControl = new FormControl('', Validators.required);

  constructor(
    private fb: FormBuilder, 
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private api: ApiService, 
    private toastService: NgToastService
  ) {}

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
      console.log(val['id'])
      this.api.getEventObjId(this.userIdToUpdate)
      .subscribe(res=>{
        this.isUpdateActive = true;
        this.fillFormToUpdate(res);
      });
    });
  }

  submit() {
    if (this.eventForm.valid) {
      const eventModel: EventModel = {
        eventName: this.eventForm.get('eventName')?.value,
        company: this.eventForm.get('company')?.value,
        type: this.eventForm.get('type')?.value,
        to: this.eventForm.get('to')?.value,
        bcc: this.eventForm.get('bcc')?.value,
        hour: this.eventForm.get('hour')?.value,
        minute: this.eventForm.get('minute')?.value,
        date: this.eventForm.get('date')?.value,
        imageFile: this.eventForm.get('imageFile')?.value ? this.eventForm.get('imageFile')?.value._files[0] : null,
        textTemplate: this.eventForm.get('textTemplate')?.value,
        id: this.userIdToUpdate
      };

      console.log(eventModel)

      this.api.postEventObj(eventModel)
        .subscribe(
          res => {
            this.toastService.success({ detail: "SUCCESS", summary: "Enquiry Added", duration: 3000 });
            this.eventForm.reset();
          },
          error => {
            console.error("Error adding event", error);
          }
        );
    }
  }
  
  update() {
    if (this.eventForm.valid) {
      const eventModel: EventModel = {
        eventName: this.eventForm.get('eventName')?.value,
        company: this.eventForm.get('company')?.value,
        type: this.eventForm.get('type')?.value,
        to: this.eventForm.get('to')?.value,
        bcc: this.eventForm.get('bcc')?.value,
        hour: this.eventForm.get('hour')?.value,
        minute: this.eventForm.get('minute')?.value,
        date: this.eventForm.get('date')?.value,
        imageFile: this.eventForm.get('imageFile')?.value ? this.eventForm.get('imageFile')?.value._files[0] : null,
        textTemplate: this.eventForm.get('textTemplate')?.value,
        id: this.eventForm.get('id')?.value
      };

      this.api.updateEventObj(eventModel, this.userIdToUpdate)
        .subscribe(
          res => {
            this.toastService.success({ detail: "SUCCESS", summary: "Enquiry Updated", duration: 3000 });
            this.eventForm.reset();
            this.router.navigate(['event-list']);
          },
          error => {
            console.error("Error updating event", error);
          }
        );
    }
  }

  fillFormToUpdate(user: EventModel) {
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
