import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminModel } from '../models/admin.model';
import { EventModel } from '../models/event.model';
import { CompanyModel } from '../models/company.model';
import { EmployeeModel } from '../models/employee.model';

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
    return this.http.post<AdminModel>(`${this.adminDataBaseUrl}`, registerObj)
  }

  getRegisteredUser() {
    return this.http.get<AdminModel[]>(`${this.adminDataBaseUrl}`)
  }

  updateRegisterUser(registerObj: AdminModel, RegId: number) {
    return this.http.put<AdminModel>(`${this.adminDataBaseUrl}/${RegId}`, registerObj)
  }

  deleteRegistered(RegId: number) {
    return this.http.delete<AdminModel>(`${this.adminDataBaseUrl}/${RegId}`)
  }

  getRegisteredUserId(RegId: number) {
    return this.http.get<AdminModel>(`${this.adminDataBaseUrl}/${RegId}`)
  }

  postEventObj(registerObj: EventModel) {
    return this.http.post<EventModel>(`${this.eventDataBaseUrl}`, registerObj)
  }

  getEventObj() {
    return this.http.get<EventModel[]>(`${this.eventDataBaseUrl}`)
  }

  updateEventObj(registerObj: EventModel, id: number) {
    return this.http.put<EventModel>(`${this.eventDataBaseUrl}/${id}`, registerObj)
  }

  deleteEventObj(id: number) {
    return this.http.delete<EventModel>(`${this.eventDataBaseUrl}/${id}`)
  }

  getEventObjId(id: number) {
    return this.http.get<EventModel>(`${this.eventDataBaseUrl}/${id}`)
  }

  postCompanyObj(registerObj: CompanyModel) {
    return this.http.post<CompanyModel>(`${this.companyDataBaseUrl}`, registerObj)
  }

  getCompanyObj() {
    return this.http.get<CompanyModel[]>(`${this.companyDataBaseUrl}`)
  }

  updateCompanyObj(registerObj: CompanyModel, id: number) {
    return this.http.put<CompanyModel>(`${this.companyDataBaseUrl}/${id}`, registerObj)
  }

  deleteCompanyObj(id: number) {
    return this.http.delete<CompanyModel>(`${this.companyDataBaseUrl}/${id}`)
  }

  getCompanyObjId(id: number) {
    return this.http.get<CompanyModel>(`${this.companyDataBaseUrl}/${id}`)
  }
  
  postEmployeeObj(registerObj: EmployeeModel) {
    return this.http.post<EmployeeModel>(`${this.employeeDataBaseUrl}`, registerObj)
  }

  getEmployeeObj() {
    return this.http.get<EmployeeModel[]>(`${this.employeeDataBaseUrl}`)
  }

  updateEmployeeObj(registerObj: EmployeeModel, id: number) {
    return this.http.put<EmployeeModel>(`${this.employeeDataBaseUrl}/${id}`, registerObj)
  }

  deleteEmployeeObj(id: number) {
    return this.http.delete<EmployeeModel>(`${this.employeeDataBaseUrl}/${id}`)
  }

  getEmployeeObjId(id: number) {
    return this.http.get<EmployeeModel>(`${this.employeeDataBaseUrl}/${id}`)
  }
}