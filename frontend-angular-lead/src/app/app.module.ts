import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { SideMenuComponent } from './dashboard/components/side-menu/side-menu.component';
import { HeaderNavComponent } from './dashboard/components/header-nav/header-nav.component';
import { SidebarComponent } from './dashboard/components/sidebar/sidebar.component';
import { DashboardReportsComponent } from './dashboard/dashboard-reports/dashboard-reports.component';
import { LeadsComponent } from './dashboard/leads/leads.component';
import { HttpClientModule }    from '@angular/common/http';
import { AddLeadsComponent } from './dashboard/leads/add-leads/add-leads.component';

import { ToastrModule } from 'ngx-toastr';
import { EditLeadsComponent } from './dashboard/leads/edit-leads/edit-leads.component';
import { DeleteLeadsComponent } from './dashboard/leads/delete-leads/delete-leads.component';
import {CalendarModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/dropdown';
import { SpinnerComponent } from './dashboard/components/spinner/spinner.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { ScheduldedComponent } from './dashboard/schedulded/schedulded.component';
import { FollowupComponent } from './dashboard/followup/followup.component';
import { CustomersComponent } from './dashboard/customers/customers.component';
import { UnqualifiedComponent } from './dashboard/unqualified/unqualified.component';
import { RecordingsComponent } from './dashboard/recordings/recordings.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AddScheduldedComponent } from './dashboard/schedulded/add-schedulded/add-schedulded.component';
import { EditScheduldedComponent } from './dashboard/schedulded/edit-schedulded/edit-schedulded.component';
import { DeleteScheduldedComponent } from './dashboard/schedulded/delete-schedulded/delete-schedulded.component';
import { AddFollowupComponent } from './dashboard/followup/add-followup/add-followup.component';
import { EditFollowupComponent } from './dashboard/followup/edit-followup/edit-followup.component';
import { DeleteFollowupComponent } from './dashboard/followup/delete-followup/delete-followup.component';
import { AddCustomersComponent } from './dashboard/customers/add-customers/add-customers.component';
import { EditCustomersComponent } from './dashboard/customers/edit-customers/edit-customers.component';
import { DeleteCustomersComponent } from './dashboard/customers/delete-customers/delete-customers.component';
import { AddUnqualifiedComponent } from './dashboard/unqualified/add-unqualified/add-unqualified.component';
import { EditUnqualifiedComponent } from './dashboard/unqualified/edit-unqualified/edit-unqualified.component';
import { DeleteUnqualifiedComponent } from './dashboard/unqualified/delete-unqualified/delete-unqualified.component';
import { AddRecordingsComponent } from './dashboard/recordings/add-recordings/add-recordings.component';
import { EditRecordingsComponent } from './dashboard/recordings/edit-recordings/edit-recordings.component';
import { DeleteRecordingsComponent } from './dashboard/recordings/delete-recordings/delete-recordings.component';
import { EditProfileComponent } from './dashboard/profile/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SideMenuComponent,
    HeaderNavComponent,
    SidebarComponent,
    LeadsComponent,
    DashboardReportsComponent,
    AddLeadsComponent,
    EditLeadsComponent,
    DeleteLeadsComponent,
    SpinnerComponent,

    ScheduldedComponent,
    FollowupComponent,
    CustomersComponent,
    UnqualifiedComponent,
    RecordingsComponent,
    ProfileComponent,
    AddScheduldedComponent,
    EditScheduldedComponent,
    DeleteScheduldedComponent,
    AddFollowupComponent,
    EditFollowupComponent,
    DeleteFollowupComponent,
    AddCustomersComponent,
    EditCustomersComponent,
    DeleteCustomersComponent,
    AddUnqualifiedComponent,
    EditUnqualifiedComponent,
    DeleteUnqualifiedComponent,
    AddRecordingsComponent,
    EditRecordingsComponent,
    DeleteRecordingsComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
     BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CalendarModule,
  
    DropdownModule,
    //FileUploadModule,
    ToastrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
