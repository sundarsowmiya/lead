import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Route, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { LeadService } from '../../services/lead.service';
import { CalendarModule } from 'primeng/calendar';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;
  modal;
  addleadsForm: FormGroup;
  emailId;
  phoneNumber;
  name;
  organization;
  expiryDate;
  constructor(
    private _location: Location,
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private chgDt: ChangeDetectorRef,
    private leadService: LeadService) {
    this.addleadsForm = this.fb.group({
      emailId: ["", [Validators.required, Validators.email]],
      phoneNumber: ["", [Validators.required]],
      name: ["", [Validators.required]],
      organization: ["", [Validators.required]], 
      expiryDate: ["", [Validators.required]],
    })
    this.emailId = this.addleadsForm.get('emailId');
    this.phoneNumber = this.addleadsForm.get('phoneNumber');
    this.name = this.addleadsForm.get('name');
    this.organization = this.addleadsForm.get('organization');
    this.expiryDate = this.addleadsForm.get('expiryDate');
  }



  ngOnInit() {
    this.chgDt.detectChanges();
  }
  get f() { return this.addleadsForm.controls; }
  backClicked() {
    //this._location.back();
    this.router.navigate(['/dashboard/leads']);
  }


  addleads() {
    // this.submitted = true;
  //   if (this.addleadsForm.invalid) {
  //     return;
  // }else{


    this.leadService.performActionAddleads(this.addleadsForm.value).subscribe(
      (response: any) => {
        this.closeModal();
       //this.fetchTableData();
      },
      error => console.log(error, "error")
    )
  
}


  private closeModal(): void {
    this.backClicked();
    this.toastr.info('Record Created Sucessfully.');
  }


}
