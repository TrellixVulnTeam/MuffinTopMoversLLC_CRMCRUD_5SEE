import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {CustomerApiService} from '../customer-api.service'
import {ActivatedRoute} from '@angular/router'
import { fromEventPattern } from 'rxjs';
@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  errormsg: any;
  successmsg:any;
  getparamid:any;
  constructor(private service:CustomerApiService, private router:ActivatedRoute) { }
  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('customer_ID');
    this.service.getSingleCustomer(this.getparamid).subscribe((res)=>{
      console.log('res==>',res);
      this.customerForm.patchValue({
        'full_name':res.data.full_name,
        'phone_number':res.data.phone_number,
        'address': res.data.address,
        'email':res.data.email
      });
    });
  }

  customerForm = new FormGroup({
    'full_name': new FormControl(''),
    'phone_number': new FormControl(''),
    'email': new FormControl(''),
    'address': new FormControl('')
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
