import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {CustomerApiService} from '../customer-api.service'
import {ActivatedRoute, Router} from '@angular/router'
import { EmployeeApiService } from '../employee-api.service';
@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.css']
})

export class CreateEmployeesComponent implements OnInit {
  errormsg: any;
  successmsg:any;
  getparamid:any;
  constructor(private service:EmployeeApiService, private router:ActivatedRoute, private Router: Router) { }
  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('employee_id');
    this.service.getSingleEmployee(this.getparamid).subscribe((res)=>{
      console.log('res==>',res);
      this.employeeForm.patchValue({
        'full_name':res.data.full_name,
        'phone_number':res.data.phone_number,
        'email': res.data.email,
        'address': res.data.address,
        'role': res.data.role,

      });
    });
  }

  employeeForm = new FormGroup({
    'full_name': new FormControl(''),
    'phone_number': new FormControl(''),
    'email': new FormControl(''),
    'address': new FormControl(''),
    'role': new FormControl('')
  });
  redirectTo(uri:string){
    this.Router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.Router.navigate([uri]));
  }
  //Add new Customer
  employeeSubmit() {
      this.errormsg = null;
      this.successmsg = null;
      console.log(this.employeeForm.value)
      this.service.createData(this.employeeForm.value).subscribe((res)=>{
        this.successmsg = 'Successfully Added New Employee... Redirecting To Table...';
        this.employeeForm.reset();
        setTimeout(() => {
          this.redirectTo('/read-employee');
        }, 850); 
      },
      
      (error: HttpErrorResponse)=>{
        this.errormsg = error;
        this.employeeForm.reset();
      });
    }
  //Update Customer Data
  employeeUpdate(){
    this.errormsg = null;
    this.successmsg = null;
    console.log(this.employeeForm.value,this.getparamid)
    this.service.updateEmployee(this.employeeForm.value,this.getparamid).subscribe((res)=>{
      this.successmsg = 'Successfully Updated Employee Information.';
    },
      
    (error: HttpErrorResponse)=>{
      this.errormsg = error;
    });
  }
  
  }

