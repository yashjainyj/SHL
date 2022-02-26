import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebsiteComponent } from './website/website.component';

import {HttpClientModule} from '@angular/common/http';


import {InputTextModule} from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import {InputTextareaModule} from 'primeng/inputtextarea';
// import {ChartModule} from 'primeng/chart';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {SidebarModule} from 'primeng/sidebar';
import {CarouselModule} from 'primeng/carousel';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CalendarModule} from 'primeng/calendar';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {TimelineModule} from 'primeng/timeline';
import {CardModule} from 'primeng/card';import { GalleriaModule } from 'primeng/galleria';
import {ColorPickerModule} from 'primeng/colorpicker';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Login_signupComponent } from './login_signup/login_signup.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { DashboardComponent } from './dashboard/dashboard.component';
import {PaginatorModule} from 'primeng/paginator';
import { AddUserComponent } from './addUser/addUser.component';
import {PanelModule} from 'primeng/panel';
import {ChartModule} from 'primeng/chart';


import { EditUserComponent } from './editUser/editUser.component';
import { RenewUpdateSlotComponent } from './renewUpdateSlot/renewUpdateSlot.component';
import { InvoiceDetailsComponent } from './invoiceDetails/invoiceDetails.component';
import { LiveSeatComponent } from './live-seat/live-seat.component';
import { StaffManageComponent } from './staff-manage/staff-manage.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { WebsiteManageComponent } from './website-manage/website-manage.component';
import { SearchPipe } from './pipe/Search.pipe';
@NgModule({
  declarations: [						
    AppComponent,
      WebsiteComponent,
      Login_signupComponent,
      DashboardComponent,
      AddUserComponent,
      EditUserComponent,
      RenewUpdateSlotComponent,
      InvoiceDetailsComponent,
    LiveSeatComponent,
  StaffManageComponent,
  PaymentPageComponent,
  WebsiteManageComponent,
  SearchPipe
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PanelModule,
    PaginatorModule,
    GalleriaModule,
    ChartModule,
    TimelineModule,
    MessagesModule,
    
    MessageModule,
    CardModule,
    CarouselModule,
    ToastModule,
    FormsModule,
    CalendarModule,
    HttpClientModule,
    DialogModule,
    TableModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    OverlayPanelModule,
    InputTextModule,
    TabViewModule,InputTextareaModule,ColorPickerModule,
    // ChartModule,/
    SidebarModule
  ],
  providers: [MessageService],
  // schemas:[CUSTOM_ELEMENTS_SCHEMA],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [AppComponent]
})
export class AppModule { }
