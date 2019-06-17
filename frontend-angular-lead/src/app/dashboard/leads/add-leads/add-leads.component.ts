import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Route, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { LeadService } from '../../../services/lead.service';
import { CalendarModule } from 'primeng/calendar';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-leads',
  templateUrl: './add-leads.component.html',
  styleUrls: ['./add-leads.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddLeadsComponent implements OnInit {
  //  dateTime1: Date;

  @ViewChild('closeBtn') closeBtn: ElementRef;
  modal;
  addleadsForm: FormGroup;
  name;
  phoneNumber;
  emailId;
  organization;
  scheduldedTime;
  markas;
  scheduldedDate;
  leadStatus;
  remarks;
  followupTime;
  followupDate;
  information;
  message;
  IsmodelShow: any;
  submitted = false;
  tData: any;
  value: Date;
  dealsize;
  condtion = false;
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
      markas: ["", [Validators.required]],
      name: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required, Validators.minLength(10)]],
      organization: ["", [Validators.required]],
      scheduldedTime: ["", [Validators.required]],
      leadStatus: ["", [Validators.required]],
      remarks: ["", [Validators.required]],
      scheduldedDate: ["", [Validators.required]],
      followupTime: ["", [Validators]],
      followupDate: ["", [Validators]],
      information: ["", [Validators.required]],
      dealsize: ["", [Validators.required]],
      message: ["", [Validators.required]],
    })
    this.emailId = this.addleadsForm.get('emailId');
    this.markas = this.addleadsForm.get('markas');
    this.name = this.addleadsForm.get('name');
    this.phoneNumber = this.addleadsForm.get('phoneNumber');
    this.organization = this.addleadsForm.get('organization');
    this.scheduldedTime = this.addleadsForm.get('scheduldedTime');
    this.leadStatus = this.addleadsForm.get('leadStatus');
    this.remarks = this.addleadsForm.get('remarks');
    this.scheduldedDate = this.addleadsForm.get('scheduldedDate');
    this.followupTime = this.addleadsForm.get('followupTime');
    this.followupDate = this.addleadsForm.get('followupDate');
    this.information = this.addleadsForm.get('information');
    this.dealsize = this.addleadsForm.get('dealsize');
    this.message = this.addleadsForm.get('message');
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
  
    this.addleadsForm.value.scheduldedDate = new DatePipe('en-US').transform(this.addleadsForm.value.scheduldedDate, 'MM/dd/yyyy')
    this.addleadsForm.value.followupDate = new DatePipe('en-US').transform(this.addleadsForm.value.followupDate, 'MM/dd/yyyy')
    
    if(this.addleadsForm.value.scheduldedTime == 'NaN' || this.addleadsForm.value.scheduldedDate == 'NaN' || this.addleadsForm.value.scheduldedTime =='undefined' || this.addleadsForm.value.scheduldedDate =='undefined' || this.addleadsForm.value.scheduldedTime =='' || this.addleadsForm.value.scheduldedDate =='' || this.addleadsForm.value.scheduldedTime == null || this.addleadsForm.value.scheduldedDate == null) {
      //  console.log(this.addleadsForm.value.scheduldedTime, +"time");
      //  console.log(this.addleadsForm.value.scheduldedDate, +"date");
        this.addleadsForm.value.flagSchedulded='0';
      //  console.log("flag-0");
      }else{
      //  console.log(this.addleadsForm.value.scheduldedTime, +"time");
       // console.log(this.addleadsForm.value.scheduldedDate, +"date");
        this.addleadsForm.value.flagSchedulded='1';
       // console.log("flag-1");
      }

    // if(this.addleadsForm.value.scheduldedTime !="" || this.addleadsForm.value.scheduldedDate !="") {
    //   this.addleadsForm.value.flagSchedulded='1';
    // }else{
    //   this.addleadsForm.value.flagSchedulded='0';
    // }
    if(this.addleadsForm.value.markas =="FollowUp")
    { this.addleadsForm.value.flag='1';
    }else if(this.addleadsForm.value.markas =="Customer"){
      this.addleadsForm.value.flag='2';
    } else if(this.addleadsForm.value.markas =="Unqualified"){
      this.addleadsForm.value.flag='3';
    }else{
      this.addleadsForm.value.flag='0';
    }

    this.leadService.performActionAddleads(this.addleadsForm.value).subscribe(
      (response: any) => {
        this.closeModal();
        this.fetchTableData();

      },
      error => console.log(error, "error")
    )
  
}
  fetchTableData() {
    this.tData = true;
  }

  private closeModal(): void {
    this.backClicked();
    // this.closeBtn.nativeElement.click();
    this.toastr.info('Record Created Sucessfully.');
    $('#datatable-buttons').DataTable().ajax.reload();
  }
  followup($event) {
    if ($event == "FollowUp") {
      this.condtion = true
    } else {
      this.condtion = false
    }

  }


}
