import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CreateEmployeesComponent } from './create-employees/create-employees.component';
import { ReadCustomerComponent } from './read-customer/read-customer.component';
import { ReadEmployeesComponent } from './read-employees/read-employees.component';

const routes: Routes = [
  { path: 'create-customer', component: CreateCustomerComponent },
  {path: 'create-customer/:id', component:CreateCustomerComponent},
  { path: 'read-customer', component: ReadCustomerComponent },
  { path: 'create-employee', component: CreateEmployeesComponent},
  {path: 'create-employee/:id', component:CreateEmployeesComponent},
  { path: 'read-employee', component: ReadEmployeesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
