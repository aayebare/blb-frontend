import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './container/layout/default-layout/default-layout.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { ContractorsComponent } from './views/pages/contractors/contractors.component';
import { AddContractorsComponent } from './views/pages/add-contractors/add-contractors.component';
import { AuthGuard } from './auth.guard';
import { Page404Component } from './views/pages/page-404/page-404.component';
import { SubscriptionModalComponent } from './views/pages/subscriptions/subscriptions.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: DefaultLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'contractors', component: ContractorsComponent },
      { path: 'edit-contractor/:id', component: AddContractorsComponent }, 
      { path: 'add-contractor', component: AddContractorsComponent }, 
      { path: 'add-sub', component: SubscriptionModalComponent }, 

    
      // Add more routes here for other views
    ]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
