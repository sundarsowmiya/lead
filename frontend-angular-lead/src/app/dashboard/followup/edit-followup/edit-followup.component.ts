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
  selector: 'app-edit-followup',
  templateUrl: './edit-followup.component.html',
  styleUrls: ['./edit-followup.component.css']
})
export class EditFollowupComponent implements OnInit {
  currentUrl;
  currentValue:boolean=false;
  condtion = false;
  editFollowupForm:FormGroup;
  buttontype = false;
  constructor(private _location: Location,
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router,
    private chgDt: ChangeDetectorRef,
    private leadService: LeadService,) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        //  console.log(this.currentUrl);
      }
    });
    this.editFollowupForm = this.fb.group({
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
console.log(this.route.snapshot.params.id);
    this.leadService.performActionEditFollowup(this.route.snapshot.params.id).subscribe((resources) => {
      
      this.seteditResoucesValue(resources);
    });
  }
  get f() { return this.editFollowupForm.controls; }
  seteditResoucesValue(resources) {
    console.log(resources.dealsize);
    console.log(resources.message);
    this.editFollowupForm.controls['name'].setValue(resources.name);
    this.editFollowupForm.controls['phoneNumber'].setValue(resources.phoneNumber);
    this.editFollowupForm.controls['message'].setValue(resources.message);
    this.editFollowupForm.controls['emailId'].setValue(resources.emailId);
    this.editFollowupForm.controls['organization'].setValue(resources.organization);
    this.editFollowupForm.controls['scheduldedTime'].setValue(resources.scheduldedTime);
    this.editFollowupForm.controls['scheduldedDate'].setValue(resources.scheduldedDate);
    this.editFollowupForm.controls['remarks'].setValue(resources.remarks);
    this.editFollowupForm.controls['markas'].setValue(resources.markas);
    this.editFollowupForm.controls['leadStatus'].setValue(resources.leadStatus);
    this.editFollowupForm.controls['followupTime'].setValue(resources.followupTime);
    this.editFollowupForm.controls['followupDate'].setValue(resources.followupDate);
    this.editFollowupForm.controls['information'].setValue(resources.information);
    this.editFollowupForm.controls['dealsize'].setValue(resources.dealsize);
   
   
    if(this.editFollowupForm.value.followupTime !="" && this.editFollowupForm.value.followupTime !=null || this.editFollowupForm.value.followupDate !="" && this.editFollowupForm.value.followupDate !=null || this.editFollowupForm.value.information !="" &&  this.editFollowupForm.value.information!=null){
      this.currentValue= true;
      this.condtion = true;
    }else{
      this.currentValue= false;
      this.condtion = false;
    }
  }

  backClicked() {
    this.router.navigate(['/dashboard/followup']);
   // this._location.back()
  }
  editFollowup(f) {

    this.editFollowupForm.value.scheduldedDate = new DatePipe('en-US').transform(this.editFollowupForm.value.scheduldedDate, 'MM/dd/yyyy')
    // if(this.editFollowupForm.value.scheduldedTime !="" || this.editFollowupForm.value.scheduldedDate !="") {
    //   this.editFollowupForm.value.flagSchedulded='1';
    // }else{
    //   this.editFollowupForm.value.flagSchedulded='0';
    // }
    if(this.editFollowupForm.value.markas =="FollowUp")
    { this.editFollowupForm.value.flag='1';
    this.editFollowupForm.value.flagSchedulded='0';
    }else if(this.editFollowupForm.value.markas =="Customer"){
      this.editFollowupForm.value.flag='2';
      this.editFollowupForm.value.flagSchedulded='0';
    } else if(this.editFollowupForm.value.markas =="Unqualified"){
      this.editFollowupForm.value.flag='3';
      this.editFollowupForm.value.flagSchedulded='0';
    }else{
      this.editFollowupForm.value.flag='0';
    }
    this.buttontype = true;
    let Form = JSON.stringify(this.editFollowupForm.value);
    this.leadService.performActioneditFollowup(this.route.snapshot.params.id,Form).subscribe(
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
