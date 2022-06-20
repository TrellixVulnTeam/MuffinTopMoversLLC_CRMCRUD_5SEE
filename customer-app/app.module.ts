import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { CustomerAppComponent } from './customer-app.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { ReadCustomersComponent } from './read-customers/read-customers.component';
import { EmployeeApiService } from './employee-api.service';

import { HttpClientModule } from '@angular/common/http';
import { CustomerApiService } from './customer-api.service';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateEmployeesComponent } from './create-employees/create-employees.component';
import { ReademployeesComponent } from './reademployees/reademployees.component';
@NgModule({
  declarations: [
    CustomerAppComponent,
    CreateCustomerComponent,
    ReadCustomersComponent,
    CreateEmployeesComponent,
    ReademployeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [CustomerApiService, EmployeeApiService],
  bootstrap: [CustomerAppComponent]
})
export class AppModule { }
