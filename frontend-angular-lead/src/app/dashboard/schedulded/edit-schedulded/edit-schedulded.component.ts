import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, Route, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LeadService } from '../../../services/lead.service';
import { SharedService } from '../../../services/shared.service';
import * as config from '../../../../globalConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
const httpHeaders = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}


@Component({
  selector: 'app-edit-schedulded',
  templateUrl: './edit-schedulded.component.html',
  styleUrls: ['./edit-schedulded.component.css']
})
export class EditScheduldedComponent implements OnInit {

  childmessage = false;
  currentResources: any;
  editScheduldedForm: FormGroup;
  resourceID;
  currentUrl;
  resourceName: any;
  applicationName;
  gender;
  domain: string;
  employmentType;
  retainRelease;
  resourceClass;
  role;
  resourceManagerBankID;
  resourceManagerName;
  financialDepartment;
  country;
  city;
  currentResourceType;
  nextYearResourceType;
  transitionPeriod;
  transitionYear;
  remarks;
  administratorAccess;
  userId;
  dropDownlist;
  currentValue:boolean=false;
  condtion = false;
  applicationNameLists: Array<any>[];
  departmentList: Array<any>[];
  status: Array<any>[];
  resourceClassList: Array<any>[];
  locationCtryList: Array<any>[];
  locationList: Array<any>[];
  domainLists: Array<any>[];
  genderList: Array<any>[];
  roleList: Array<any>[];
  retainList: Array<any>[];
  cRTypeList: Array<any>[];
  nextResTypeList: Array<any>[];
  tredPeriodList: Array<any>[];
  tredYearList: Array<any>[];
  dateOfHire;
  buttontype = false;
  dropdownList = [];
  onItemSelected;
  onSelectedAll;
  dropdownSettings = {};
  constructor(private _location: Location,
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router,
    private chgDt: ChangeDetectorRef,
    private leadService: LeadService,
  ) {

  }

  ngOnInit() {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        //  console.log(this.currentUrl);
      }
    });
    this.editScheduldedForm = this.fb.group({
      name: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      emailId: ["", [Validators.required]],
      message: ["", [Validators.required]],
      organization: ["", [Validators.required]],
      scheduldedTime: ["", [Validators.required]],
      scheduldedDate: ["", [Validators.required]],
      remarks: ["", [Validators.required]],
      markas: ["", [Validators.required]],
      leadStatus: ["", [Validators.required]],
      followupTime: ["", [Validators.required]],
      followupDate: ["", [Validators.required]],
     information: ["", [Validators.required]],
    dealsize: ["", [Validators.required]],

    })
console.log(this.route.snapshot.params.id);
    this.leadService.performActionEditSchedulded(this.route.snapshot.params.id).subscribe((resources) => {
      
      this.seteditResoucesValue(resources);
    });
  }

  get f() { return this.editScheduldedForm.controls; }

  seteditResoucesValue(resources) {
    console.log(resources);
    this.editScheduldedForm.controls['name'].setValue(resources.name);
    this.editScheduldedForm.controls['phoneNumber'].setValue(resources.phoneNumber);
    this.editScheduldedForm.controls['message'].setValue(resources.message);
    this.editScheduldedForm.controls['emailId'].setValue(resources.emailId);
    this.editScheduldedForm.controls['organization'].setValue(resources.organization);
    this.editScheduldedForm.controls['scheduldedTime'].setValue(resources.scheduldedTime);
    this.editScheduldedForm.controls['scheduldedDate'].setValue(resources.scheduldedDate);
    this.editScheduldedForm.controls['remarks'].setValue(resources.remarks);
    this.editScheduldedForm.controls['markas'].setValue(resources.markas);
    this.editScheduldedForm.controls['leadStatus'].setValue(resources.leadStatus);
    this.editScheduldedForm.controls['followupTime'].setValue(resources.followupTime);
    this.editScheduldedForm.controls['followupDate'].setValue(resources.followupDate);
    this.editScheduldedForm.controls['information'].setValue(resources.information);
    this.editScheduldedForm.controls['dealsize'].setValue(resources.dealsize);

    if(this.editScheduldedForm.value.followupTime !="" && this.editScheduldedForm.value.followupTime !=null || this.editScheduldedForm.value.followupDate !="" && this.editScheduldedForm.value.followupDate !=null || this.editScheduldedForm.value.information !="" &&  this.editScheduldedForm.value.information!=null){
      this.currentValue= true;
      this.condtion = true;
    }else{
      this.currentValue= false;
      this.condtion = false;
    }
}


backClicked() {
  this.router.navigate(['/dashboard/schedulded']);
 }
  editScheduledata(f) {

    this.editScheduldedForm.value.scheduldedDate = new DatePipe('en-US').transform(this.editScheduldedForm.value.scheduldedDate, 'MM/dd/yyyy')
    this.editScheduldedForm.value.followupDate = new DatePipe('en-US').transform(this.editScheduldedForm.value.followupDate, 'MM/dd/yyyy')
   
    if(this.editScheduldedForm.value.scheduldedTime == 'NaN' || this.editScheduldedForm.value.scheduldedDate == 'NaN' || this.editScheduldedForm.value.scheduldedTime =='undefined' || this.editScheduldedForm.value.scheduldedDate =='undefined' || this.editScheduldedForm.value.scheduldedTime =='' || this.editScheduldedForm.value.scheduldedDate =='' || this.editScheduldedForm.value.scheduldedTime == null || this.editScheduldedForm.value.scheduldedDate == null) {
     console.log(this.editScheduldedForm.value.scheduldedTime, +"time");
      console.log(this.editScheduldedForm.value.scheduldedDate, +"date");
      this.editScheduldedForm.value.flagSchedulded='0';
     // console.log("flag-0");
    }else{
     // console.log(this.editScheduldedForm.value.scheduldedTime, +"time");
     // console.log(this.editScheduldedForm.value.scheduldedDate, +"date");
      this.editScheduldedForm.value.flagSchedulded='1';
     // console.log("flag-1");
    }

    if(this.editScheduldedForm.value.markas =="FollowUp")
    { 
      this.editScheduldedForm.value.flag='1';
      this.editScheduldedForm.value.flagSchedulded='0';
    }else if(this.editScheduldedForm.value.markas =="Customer"){
      this.editScheduldedForm.value.flag='2';
      this.editScheduldedForm.value.flagSchedulded='0';
    } else if(this.editScheduldedForm.value.markas =="Unqualified"){
      this.editScheduldedForm.value.flag='3';
      this.editScheduldedForm.value.flagSchedulded='0';
    }else{
      this.editScheduldedForm.value.flag='0';
    }
    this.buttontype = true;
    let Form = JSON.stringify(this.editScheduldedForm.value);
    this.leadService.performActioneditSchedulded(this.route.snapshot.params.id,Form).subscribe(
      (response: any) => {
        //console.log(response.data);
        this.toastr.info('Record Updated Sucessfully.');
        $('#datatable-buttons').DataTable().ajax.reload();
        this.backClicked();
      },
      error => console.log(error)
    )
  }

  followup($event) {
    //console.log($event);
    if (confirm('Are you sure you want to Remove the schedulded Time?')) {
      // Save it!
       this.editScheduldedForm.controls['scheduldedTime'].setValue('');
       this.editScheduldedForm.controls['scheduldedDate'].setValue('');

  } else {
      // Do nothing!
  }
    
    if ($event == "FollowUp") {
      this.currentValue= true;
      this.condtion = true
    } else {
      this.currentValue= false;
      this.condtion = false
    }

  }

}
