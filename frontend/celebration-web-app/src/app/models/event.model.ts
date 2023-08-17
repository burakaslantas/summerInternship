export class EventModel{
    eventName!: string;
    company!: string;
    type!: string;
    to!: string;
    bcc!: string;
    hour!: string;
    minute!: string;
    date!: string;
    imageFile!: File | null; // Change the type to accept null or File
    textTemplate!: string;
    id!: number;
  }
  