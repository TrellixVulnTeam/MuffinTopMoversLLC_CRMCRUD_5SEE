import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private service: ApiserviceService) { }
  errormsg:any;
  successmsg:any;
  readData: any;
  ngOnInit(): void {
    this.getAllData();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  deleteCustomer(customer_ID:any){
    this.errormsg = null;
    this.successmsg = null;
    console.log('deleteID==>',customer_ID)
    this.service.deleteData(customer_ID).subscribe((res)=>{
    this.successmsg = res.message;
    setTimeout(window.location.reload.bind(window.location), 750);    },
      
    (error: HttpErrorResponse)=>{
      this.errormsg = error;
    });
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

