import { EventModel } from '../models/event.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';
import { NGX_MAT_FILE_INPUT_CONFIG } from 'ngx-material-file-input';
import { AttachmentModel } from '../models/attachment.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  providers: [
    {
      provide: NGX_MAT_FILE_INPUT_CONFIG,
      useValue: { maxFileSize: 10 * 1024 * 1024 } // Set the same value as on the server (10MB)
    }
  ]

})
export class CreateEventComponent implements OnInit {
  maxFileSize = 10 * 1024 * 1024;
  public packages = []

  attachments: any[] = [];
  eventForm!: FormGroup;
  imgFile!: File;
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
      this.imgFile = this.eventForm.get('imageFile')?.value ? this.eventForm.get('imageFile')?.value._files[0]:File;
      this.uploadFile();
      
      const eventModel: EventModel = {
        eventName: this.eventForm.get('eventName')?.value,
        company: this.eventForm.get('company')?.value,
        type: this.eventForm.get('type')?.value,
        to: this.eventForm.get('to')?.value,
        bcc: this.eventForm.get('bcc')?.value,
        hour: this.eventForm.get('hour')?.value,
        minute: this.eventForm.get('minute')?.value,
        date: this.eventForm.get('date')?.value,
        imageFile: null,
        textTemplate: this.eventForm.get('textTemplate')?.value,
        id: this.userIdToUpdate
      };
      

      console.log(eventModel)
      console.log(this.imgFile)
      console.log(eventModel.imageFile ? this.imgFile.name : undefined)
      

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

  async uploadFile() {
    let formData = new FormData();
    formData.append('file', this.imgFile, this.imgFile.name);
    await this.api.postImgObj(formData).toPromise().then(response => {
      if (response !== undefined && response.error == null){
        const attachment : any = response; // TO DO!!! attachment
        this.attachments.push(attachment);
      }
    })
    .catch(reason => {
      console.log("Error by geting img attachment");
    })
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
