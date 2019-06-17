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
  selector: 'app-edit-customers',
  templateUrl: './edit-customers.component.html',
  styleUrls: ['./edit-customers.component.css']
})
export class EditCustomersComponent implements OnInit {
  editCustomersForm: FormGroup;
  currentUrl;
  buttontype = false;
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
    this.editCustomersForm = this.fb.group({
      name: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      emailId: ["", [Validators.required]],
      organization: ["", [Validators.required]],
      // scheduldedTime: ["", [Validators.required]],
      // scheduldedDate: ["", [Validators.required]],
      remarks: ["", [Validators.required]],
      markas: ["", [Validators.required]],
      leadStatus: ["", [Validators.required]],
      // followupTime: ["", [Validators.required]],
      // followupDate: ["", [Validators.required]],
     // information: ["", [Validators.required]],
    // dealsize: ["", [Validators.required]],

    })
console.log(this.route.snapshot.params.id);
    this.leadService.performActionEditSchedulded(this.route.snapshot.params.id).subscribe((resources) => {
      
      this.seteditResoucesValue(resources);
    });
  }

  get f() { return this.editCustomersForm.controls; }

  seteditResoucesValue(resources) {
    this.editCustomersForm.controls['name'].setValue(resources.name);
    this.editCustomersForm.controls['phoneNumber'].setValue(resources.phoneNumber);
    //this.editCustomersForm.controls['domain'].setValue(resources.domain);
    this.editCustomersForm.controls['emailId'].setValue(resources.emailId);
    this.editCustomersForm.controls['organization'].setValue(resources.organization);
    // this.editCustomersForm.controls['scheduldedTime'].setValue(resources.scheduldedTime);
    // this.editCustomersForm.controls['scheduldedDate'].setValue(resources.scheduldedDate);
    this.editCustomersForm.controls['remarks'].setValue(resources.remarks);
    this.editCustomersForm.controls['markas'].setValue(resources.markas);
    this.editCustomersForm.controls['leadStatus'].setValue(resources.leadStatus);
}


  backClicked() {
  //  this._location.back()
  this.router.navigate(['/dashboard/customers']);
  }
  editCustomersdata(f) {

   //this.editCustomersForm.value.scheduldedDate = new DatePipe('en-US').transform(this.editCustomersForm.value.scheduldedDate, 'MM/dd/yyyy')
    // if(this.editCustomersForm.value.scheduldedTime !="" || this.editCustomersForm.value.scheduldedDate !="") {
    //   this.editCustomersForm.value.flagSchedulded='1';
    // }else{
    //   this.editCustomersForm.value.flagSchedulded='0';
    // }
    if(this.editCustomersForm.value.markas =="FollowUp")
    { this.editCustomersForm.value.flag='1';
    }else if(this.editCustomersForm.value.markas =="Customer"){
      this.editCustomersForm.value.flag='2';
    } else if(this.editCustomersForm.value.markas =="Unqualified"){
      this.editCustomersForm.value.flag='3';
    }else{
      this.editCustomersForm.value.flag='0';
    }
    this.buttontype = true;
    let Form = JSON.stringify(this.editCustomersForm.value);
    this.leadService.performActioneditCustomers(this.route.snapshot.params.id,Form).subscribe(
      (response: any) => {
        //console.log(response.data);
        this.toastr.info('Record Updated Sucessfully.');
        $('#datatable-buttons').DataTable().ajax.reload();
        this.backClicked();
      },
      error => console.log(error)
    )
  }

}
