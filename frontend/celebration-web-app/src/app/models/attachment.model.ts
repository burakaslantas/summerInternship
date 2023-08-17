import { EventModel } from "./event.model";

export class AttachmentModel{
    id!:               number;
    originalName!:     string;
    fileName!:         string;
    filePath!:         string;
    event!:            EventModel;
}