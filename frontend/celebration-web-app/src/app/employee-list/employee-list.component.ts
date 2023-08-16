import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeModel } from '../models/employee.model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})

export class EmployeeListComponent implements OnInit {
  public dataSource!: MatTableDataSource<EmployeeModel>
  public users!: EmployeeModel[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'employeeName', 'employeeSurname', 'employeeEmail', 'employeeRegNo', 'employeeStartDate', 'employeeBirthDay', 'managerName', 'managerSurname', 'managerRegNo', 'companyRegNo', 'action'];

  constructor(private api: ApiService, private router: Router, private toast: NgToastService, private confirm: NgConfirmService){ }
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.api.getEmployeeObj()
    .subscribe(res=>{
      this.users = res;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(id: number){
    this.router.navigate(['employee-list/update', id]);
  }

  deleteUser(id: number){
    this.confirm.showConfirm("Are you sure want to delete?",
    ()=>{ // yes case
      this.api.deleteEmployeeObj(id)
      .subscribe(res=>{
        this.toast.success({ detail: 'SUCCESS', summary: 'Deleted Successfully', duration: 3000});
        this.getUsers();
      })
    },
    ()=>{ //no case

    })
    
  }
}