import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {ApiserviceService} from '../apiservice.service'
import {ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  errormsg: any;
  successmsg:any;
  getparamid:any;
  constructor(private service:ApiserviceService, private router:ActivatedRoute) { }
  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('customer_ID');
    this.service.getSingleCustomer(this.getparamid).subscribe((res)=>{
      console.log('res==>',res);
      this.customerForm.patchValue({
        'Full_Name':res.data.Full_Name,
        'Phone_Number':res.data.Phone_Number,
        'Last_Known_Address': res.data.Last_Known_Address
      });
    });
  }

  customerForm = new FormGroup({
    'Full_Name': new FormControl(''),
    'Phone_Number': new FormControl(''),
    'Last_Known_Address': new FormControl('')
  });
  //Add new Customer
  customerSubmit() {
      this.errormsg = null;
      this.successmsg = null;
      console.log(this.customerForm.value)
      this.service.createData(this.customerForm.value).subscribe((res)=>{
        this.successmsg = 'Successfully Added New Customer.';
        this.customerForm.reset();
      },
      
      (error: HttpErrorResponse)=>{
        this.errormsg = error;
        this.customerForm.reset();
      });
    }
  //Update Customer Data
  customerUpdate(){
    this.errormsg = null;
    this.successmsg = null;
    console.log(this.customerForm.value,this.getparamid)
    this.service.updateCustomer(this.customerForm.value,this.getparamid).subscribe((res)=>{
      this.successmsg = 'Successfully Updated Customer Information.';
    },
      
    (error: HttpErrorResponse)=>{
      this.errormsg = error;
    });
  }
  }
