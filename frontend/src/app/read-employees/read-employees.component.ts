import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeApiService } from '../employee-api.service';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-customer',
  templateUrl: './read-employees.component.html',
  styleUrls: ['./read-employees.component.css']
})
export class ReadEmployeesComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private service: EmployeeApiService, private router: Router) { }
  errormsg:any;
  successmsg:any;
  readData: any;
  ngOnInit(): void {
    this.getAllData();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  deleteEmployee(employee_id:any){
    this.errormsg = null;
    this.successmsg = null;
    console.log('deleteID==>',employee_id)
    this.service.deleteData(employee_id).subscribe((res)=>{
    this.successmsg = res.message;    
     setTimeout(() => {
      this.redirectTo('/read-employee');
    }, 850);   },
    
    (error: HttpErrorResponse)=>{
      this.errormsg = error;
    });
}
redirectTo(uri:string){
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate([uri]));
}
getAllData(){
  this.service.getAllData().subscribe((res) => { 
    console.log(res, "res==>");
    this.readData = res.data;
    this.dtTrigger.next(this.readData);
    this.dtTrigger.unsubscribe();
});
}
}

