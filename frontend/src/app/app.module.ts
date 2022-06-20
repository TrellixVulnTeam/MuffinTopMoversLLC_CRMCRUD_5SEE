import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { ReadCustomerComponent } from './read-customer/read-customer.component';

import { HttpClientModule } from '@angular/common/http';
import { CustomerApiService } from './customer-api.service';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateEmployeesComponent } from './create-employees/create-employees.component';
import { ReadEmployeesComponent } from './read-employees/read-employees.component';
@NgModule({
  declarations: [
    AppComponent,
    CreateCustomerComponent,
    ReadCustomerComponent,
    CreateEmployeesComponent,
    ReadEmployeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [CustomerApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
