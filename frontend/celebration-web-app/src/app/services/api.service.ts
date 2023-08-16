import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminModel } from '../models/admin.model';
import { EventModel } from '../models/event.model';
import { CompanyModel } from '../models/company.model';
import { EmployeeModel } from '../models/employee.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private adminDataBaseUrl: string = "http://localhost:3000/adminDataBaseUrl"
  private eventDataBaseUrl: string = "http://localhost:3000/eventDataBaseUrl"
  private companyDataBaseUrl: string = "http://localhost:3000/companyDataBaseUrl"
  private employeeDataBaseUrl: string = "http://localhost:3000/employeeDataBaseUrl"
  constructor(private http: HttpClient) { }

  postRegistration(registerObj: AdminModel) {
    return this.http.post<AdminModel>(`${this.adminDataBaseUrl}`, registerObj, httpOptions)
  }

  getRegisteredUser() {
    return this.http.get<AdminModel[]>(`${this.adminDataBaseUrl}`, httpOptions)
  }

  updateRegisterUser(registerObj: AdminModel, RegId: number) {
    return this.http.put<AdminModel>(`${this.adminDataBaseUrl}/${RegId}`, registerObj, httpOptions)
  }

  deleteRegistered(RegId: number) {
    return this.http.delete<AdminModel>(`${this.adminDataBaseUrl}/${RegId}`, httpOptions)
  }

  getRegisteredUserId(RegId: number) {
    return this.http.get<AdminModel>(`${this.adminDataBaseUrl}/${RegId}`, httpOptions)
  }

  postEventObj(registerObj: EventModel) {
    return this.http.post<EventModel>(`${this.eventDataBaseUrl}`, registerObj, httpOptions)
  }

  getEventObj() {
    return this.http.get<EventModel[]>(`${this.eventDataBaseUrl}`, httpOptions)
  }

  updateEventObj(registerObj: EventModel, id: number) {
    return this.http.put<EventModel>(`${this.eventDataBaseUrl}/${id}`, registerObj, httpOptions)
  }

  deleteEventObj(id: number) {
    return this.http.delete<EventModel>(`${this.eventDataBaseUrl}/${id}`, httpOptions)
  }

  getEventObjId(id: number) {
    return this.http.get<EventModel>(`${this.eventDataBaseUrl}/${id}`, httpOptions)
  }

  postCompanyObj(registerObj: CompanyModel) {
    return this.http.post<CompanyModel>(`${this.companyDataBaseUrl}`, registerObj, httpOptions)
  }

  getCompanyObj() {
    return this.http.get<CompanyModel[]>(`${this.companyDataBaseUrl}`, httpOptions)
  }

  updateCompanyObj(registerObj: CompanyModel, id: number) {
    return this.http.put<CompanyModel>(`${this.companyDataBaseUrl}/${id}`, registerObj, httpOptions)
  }

  deleteCompanyObj(id: number) {
    return this.http.delete<CompanyModel>(`${this.companyDataBaseUrl}/${id}`, httpOptions)
  }

  getCompanyObjId(id: number) {
    return this.http.get<CompanyModel>(`${this.companyDataBaseUrl}/${id}`, httpOptions)
  }
  
  postEmployeeObj(registerObj: EmployeeModel) {
    return this.http.post<EmployeeModel>(`${this.employeeDataBaseUrl}`, registerObj, httpOptions)
  }

  getEmployeeObj() {
    return this.http.get<EmployeeModel[]>(`${this.employeeDataBaseUrl}`, httpOptions)
  }

  updateEmployeeObj(registerObj: EmployeeModel, id: number) {
    return this.http.put<EmployeeModel>(`${this.employeeDataBaseUrl}/${id}`, registerObj, httpOptions)
  }

  deleteEmployeeObj(id: number) {
    return this.http.delete<EmployeeModel>(`${this.employeeDataBaseUrl}/${id}`, httpOptions)
  }

  getEmployeeObjId(id: number) {
    return this.http.get<EmployeeModel>(`${this.employeeDataBaseUrl}/${id}`, httpOptions)
  }
}