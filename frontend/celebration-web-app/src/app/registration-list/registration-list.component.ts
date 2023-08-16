import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminModel } from '../models/admin.model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit {
  public dataSource!: MatTableDataSource<AdminModel>
  public users!: AdminModel[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'adminName', 'company', 'email', 'emailPassword', 'action'];

  constructor(private api: ApiService, private router: Router, private toast: NgToastService, private confirm: NgConfirmService){ }
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.api.getRegisteredUser()
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
    this.router.navigate(['admin-list/update', id]);
  }

  deleteUser(id: number){
    this.confirm.showConfirm("Are you sure want to delete?",
    ()=>{ // yes case
      this.api.deleteRegistered(id)
      .subscribe(res=>{
        this.toast.success({ detail: 'SUCCESS', summary: 'Deleted Successfully', duration: 3000});
        this.getUsers();
      })
    },
    ()=>{ //no case

    })
    
  }
}