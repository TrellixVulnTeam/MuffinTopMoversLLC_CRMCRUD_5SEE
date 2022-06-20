import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { ReadCustomersComponent } from './read-customers/read-customers.component';
import { Router } from '@angular/router';
const routes: Routes = [
  { path: 'create-customer', component: CreateCustomerComponent },
  {path: 'create-customer/:customer_ID', component:CreateCustomerComponent},
  { path: 'read-customer', component: ReadCustomersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
