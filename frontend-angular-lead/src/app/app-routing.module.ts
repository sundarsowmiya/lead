import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardReportsComponent } from './dashboard/dashboard-reports/dashboard-reports.component';
import { LeadsComponent } from './dashboard/leads/leads.component';
import { AddLeadsComponent } from './dashboard/leads/add-leads/add-leads.component';
import { NeedAuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
//import { SuperRoleGuard } from './super.role.guard'
import { EditLeadsComponent } from './dashboard/leads/edit-leads/edit-leads.component';
import { DeleteLeadsComponent } from './dashboard/leads/delete-leads/delete-leads.component';

import { ScheduldedComponent } from './dashboard/schedulded/schedulded.component';
import { AddScheduldedComponent } from './dashboard/schedulded/add-schedulded/add-schedulded.component';
import { EditScheduldedComponent } from './dashboard/schedulded/edit-schedulded/edit-schedulded.component';
import { DeleteScheduldedComponent } from './dashboard/schedulded/delete-schedulded/delete-schedulded.component';

import { FollowupComponent } from './dashboard/followup/followup.component';
import { AddFollowupComponent } from './dashboard/followup/add-followup/add-followup.component';
import { EditFollowupComponent } from './dashboard/followup/edit-followup/edit-followup.component';
import { DeleteFollowupComponent } from './dashboard/followup/delete-followup/delete-followup.component';

import { CustomersComponent } from './dashboard/customers/customers.component';
import { AddCustomersComponent } from './dashboard/customers/add-customers/add-customers.component';
import { EditCustomersComponent } from './dashboard/customers/edit-customers/edit-customers.component';
import { DeleteCustomersComponent } from './dashboard/customers/delete-customers/delete-customers.component';


import { UnqualifiedComponent } from './dashboard/unqualified/unqualified.component';
import { AddUnqualifiedComponent } from './dashboard/unqualified/add-unqualified/add-unqualified.component';
import { EditUnqualifiedComponent } from './dashboard/unqualified/edit-unqualified/edit-unqualified.component';
import { DeleteUnqualifiedComponent } from './dashboard/unqualified/delete-unqualified/delete-unqualified.component';

import { RecordingsComponent } from './dashboard/recordings/recordings.component';
import { AddRecordingsComponent } from './dashboard/recordings/add-recordings/add-recordings.component';
import { EditRecordingsComponent } from './dashboard/recordings/edit-recordings/edit-recordings.component';
import { DeleteRecordingsComponent } from './dashboard/recordings/delete-recordings/delete-recordings.component';

import { ProfileComponent } from './dashboard/profile/profile.component';
import { EditProfileComponent } from './dashboard/profile/edit-profile/edit-profile.component';

const routes: Routes = [
	{ path: "", redirectTo: '/login', pathMatch: 'full' },
	{ path: "index", redirectTo: '/login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{
		path: 'dashboard', component: DashboardComponent,
		// canActivate: [NeedAuthGuard, RoleGuard],
		children: [
			{ path: '', component: DashboardReportsComponent },
			{
				path: 'leads', component: LeadsComponent,
				children: [
					{ path: 'add-leads', component: AddLeadsComponent },
					{ path: 'edit-leads/:id', component: EditLeadsComponent },
					{ path: 'delete-leads/:id', component: DeleteLeadsComponent }
				]
			},
			{
				path: 'schedulded', component: ScheduldedComponent,
				children: [
					{ path: 'add-schedulded', component: AddScheduldedComponent },
					{ path: 'edit-schedulded/:id', component: EditScheduldedComponent },
					{ path: 'delete-schedulded/:id', component: DeleteScheduldedComponent }
				]
			},
			{
				path: 'followup', component: FollowupComponent,
				children: [
					{ path: 'add-followup', component: AddFollowupComponent },
					{ path: 'edit-followup/:id', component: EditFollowupComponent },
					{ path: 'delete-followup/:id', component: DeleteFollowupComponent }
				]
			},
			{
				path: 'customers', component: CustomersComponent,
				children: [
					{ path: 'add-customers', component: AddCustomersComponent },
					{ path: 'edit-customers/:id', component: EditCustomersComponent },
					{ path: 'delete-customers/:id', component: DeleteCustomersComponent }
				]
			},
			{
				path: 'unqualified', component: UnqualifiedComponent,
				children: [
					{ path: 'add-unqualified', component: AddUnqualifiedComponent },
					{ path: 'edit-unqualified/:id', component: EditUnqualifiedComponent },
					{ path: 'delete-unqualified/:id', component: DeleteUnqualifiedComponent }
				]
			},
			// {
			// 	path: 'recordings', component: RecordingsComponent,
			// 	children: [
			// 		{ path: 'add-recordings', component: AddRecordingsComponent },
			// 		{ path: 'edit-recordings/:id', component: EditRecordingsComponent },
			// 		{ path: 'delete-recordings/:id', component: DeleteRecordingsComponent }
			// 	]
			// },
			{
				path: 'profile', component: ProfileComponent,
				children: [
					{ path: 'edit-recordings/:id', component: EditProfileComponent }
				]
			},
		]
	},

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
