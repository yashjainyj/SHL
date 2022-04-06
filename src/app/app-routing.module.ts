import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './addUser/addUser.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditUserComponent } from './editUser/editUser.component';
import { InvoiceDetailsComponent } from './invoiceDetails/invoiceDetails.component';
import { LiveSeatComponent } from './live-seat/live-seat.component';
import { Login_signupComponent } from './login_signup/login_signup.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { RenewUpdateSlotComponent } from './renewUpdateSlot/renewUpdateSlot.component';
import { StaffManageComponent } from './staff-manage/staff-manage.component';
import { WebsiteManageComponent } from './website-manage/website-manage.component';
import { WebsiteComponent } from './website/website.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: WebsiteComponent },
  { path: 'login', component: Login_signupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'addUser', component: AddUserComponent },
  { path: 'payment', component: PaymentPageComponent },
  { path: 'manageWebsite', component: WebsiteManageComponent },
  { path: 'editUser/:id', component: EditUserComponent },
  {
    path: 'live-seat', 
    component:LiveSeatComponent,
    // canActivate:[AuthGuard]
  },
  {
    path: 'staffDetail', 
    component:StaffManageComponent,
    // canActivate:[AuthGuard]
  },
  {  path: 'invoiceDetail/:userid/:slotid', component:InvoiceDetailsComponent, },
  { path: 'editslot/:purpose/:id/:userid', component: RenewUpdateSlotComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
