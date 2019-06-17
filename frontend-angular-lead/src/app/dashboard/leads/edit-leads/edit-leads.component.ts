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

// import { ResourcesComponent } from '../../../dashboard/resources/resources.component';
@Component({
  selector: 'app-edit-leads',
  templateUrl: './edit-leads.component.html',
  styleUrls: ['./edit-leads.component.css']
})
export class EditLeadsComponent implements OnInit {
  childmessage = false;
  currentResources: any;
  editLeadForm: FormGroup;
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
  condtion = false;
  routid:any;
  currentValue:boolean=false;
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
          console.log(this.currentUrl);
      }
    });
    this.editLeadForm = this.fb.group({
      emailId: ["", [Validators.required]],
      markas: ["", [Validators.required]],
      message: ["", [Validators.required]],
      name: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      organization: ["", [Validators.required]],
      scheduldedTime: ["", [Validators.required]],
      leadStatus: ["", [Validators.required]],
      remarks: ["", [Validators.required]],
      scheduldedDate: ["", [Validators.required]],
      followupTime: ["", [Validators.required]],
      followupDate: ["", [Validators.required]],
      information: ["", [Validators.required]], 
      dealsize: ["", [Validators.required]],

    })
   // const allParams = this.route.snapshot.params.id
    this.route.params.subscribe(paramsId => {
      this.routid = paramsId.id;
      //console.log("----routr---"+ allParams);
  });

 console.log(this.route.snapshot.params.id);
    this.leadService.performActionEditLeads(this.route.snapshot.params.id).subscribe((resources) => {
     
      this.seteditResoucesValue(resources);
    });
  }

  get f() { return this.editLeadForm.controls; }

  seteditResoucesValue(resources) {
    console.log("----test--"+ resources);

    this.editLeadForm.controls['name'].setValue(resources.name);
    this.editLeadForm.controls['phoneNumber'].setValue(resources.phoneNumber);
    this.editLeadForm.controls['message'].setValue(resources.message);
    this.editLeadForm.controls['emailId'].setValue(resources.emailId);
    this.editLeadForm.controls['organization'].setValue(resources.organization);
    this.editLeadForm.controls['scheduldedTime'].setValue(resources.scheduldedTime);
    this.editLeadForm.controls['scheduldedDate'].setValue(resources.scheduldedDate);
    this.editLeadForm.controls['remarks'].setValue(resources.remarks);
    this.editLeadForm.controls['markas'].setValue(resources.markas);
    this.editLeadForm.controls['leadStatus'].setValue(resources.leadStatus);
    this.editLeadForm.controls['followupTime'].setValue(resources.followupTime);
    this.editLeadForm.controls['followupDate'].setValue(resources.followupDate);
    this.editLeadForm.controls['information'].setValue(resources.information);
    this.editLeadForm.controls['dealsize'].setValue(resources.dealsize);
   
    if(this.editLeadForm.value.followupTime !="" && this.editLeadForm.value.followupTime !=null || this.editLeadForm.value.followupDate !="" && this.editLeadForm.value.followupDate !=null || this.editLeadForm.value.information !="" &&  this.editLeadForm.value.information!=null){
      this.currentValue= true;
      this.condtion = true;
    }else{
      this.currentValue= false;
      this.condtion = false;
    }
  }


  backClicked() {
   this.router.navigate(['/dashboard/leads']);
  }
  editLeaddata(f) {
    this.editLeadForm.value.scheduldedDate = new DatePipe('en-US').transform(this.editLeadForm.value.scheduldedDate, 'MM/dd/yyyy')
    this.editLeadForm.value.followupDate = new DatePipe('en-US').transform(this.editLeadForm.value.followupDate, 'MM/dd/yyyy')
 
    if(this.editLeadForm.value.scheduldedTime == 'NaN' || this.editLeadForm.value.scheduldedDate == 'NaN' || this.editLeadForm.value.scheduldedTime =='undefined' || this.editLeadForm.value.scheduldedDate =='undefined' || this.editLeadForm.value.scheduldedTime =='' || this.editLeadForm.value.scheduldedDate =='' || this.editLeadForm.value.scheduldedTime == null || this.editLeadForm.value.scheduldedDate == null) {
    //  console.log(this.editLeadForm.value.scheduldedTime, +"time");
    //  console.log(this.editLeadForm.value.scheduldedDate, +"date");
      this.editLeadForm.value.flagSchedulded='0';
    //  console.log("flag-0");
    }else{
    //  console.log(this.editLeadForm.value.scheduldedTime, +"time");
     // console.log(this.editLeadForm.value.scheduldedDate, +"date");
      this.editLeadForm.value.flagSchedulded='1';
     // console.log("flag-1");
    }

    if(this.editLeadForm.value.markas =="FollowUp")
    { this.editLeadForm.value.flag='1';
    }else if(this.editLeadForm.value.markas =="Customer"){
      this.editLeadForm.value.flag='2';
    } else if(this.editLeadForm.value.markas =="Unqualified"){
      this.editLeadForm.value.flag='3';
    }else{
      this.editLeadForm.value.flag='0';
    }
  
    this.buttontype = true;
    let Form = JSON.stringify(this.editLeadForm.value);
    this.leadService.performActioneditLead(this.route.snapshot.params.id, Form).subscribe(
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
    console.log($event);
    if ($event == "FollowUp") {
      this.currentValue= true;
      this.condtion = true
    } else {
      this.currentValue= false;
      this.condtion = false
    }

  }

}
