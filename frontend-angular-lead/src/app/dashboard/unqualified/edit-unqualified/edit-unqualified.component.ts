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
  selector: 'app-edit-unqualified',
  templateUrl: './edit-unqualified.component.html',
  styleUrls: ['./edit-unqualified.component.css']
})
export class EditUnqualifiedComponent implements OnInit {
  editUnqualifiedForm: FormGroup;
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
    this.editUnqualifiedForm = this.fb.group({
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
    this.leadService.performActionEditUnqualified(this.route.snapshot.params.id).subscribe((resources) => {
      
      this.seteditUnqualifiedValue(resources);
    });
  }

  get f() { return this.editUnqualifiedForm.controls; }

  seteditUnqualifiedValue(resources) {
    this.editUnqualifiedForm.controls['name'].setValue(resources.name);
    this.editUnqualifiedForm.controls['phoneNumber'].setValue(resources.phoneNumber);
    //this.editUnqualifiedForm.controls['domain'].setValue(resources.domain);
    this.editUnqualifiedForm.controls['emailId'].setValue(resources.emailId);
    this.editUnqualifiedForm.controls['organization'].setValue(resources.organization);
    // this.editUnqualifiedForm.controls['scheduldedTime'].setValue(resources.scheduldedTime);
    // this.editUnqualifiedForm.controls['scheduldedDate'].setValue(resources.scheduldedDate);
    this.editUnqualifiedForm.controls['remarks'].setValue(resources.remarks);
    this.editUnqualifiedForm.controls['markas'].setValue(resources.markas);
    this.editUnqualifiedForm.controls['leadStatus'].setValue(resources.leadStatus);
}


  backClicked() {
    this.router.navigate(['/dashboard/unqualified']);
  }
  editUnqualifieddata(f) {

   //this.editUnqualifiedForm.value.scheduldedDate = new DatePipe('en-US').transform(this.editUnqualifiedForm.value.scheduldedDate, 'MM/dd/yyyy')
    // if(this.editUnqualifiedForm.value.scheduldedTime !="" || this.editUnqualifiedForm.value.scheduldedDate !="") {
    //   this.editUnqualifiedForm.value.flagSchedulded='1';
    // }else{
    //   this.editUnqualifiedForm.value.flagSchedulded='0';
    // }
    if(this.editUnqualifiedForm.value.markas =="FollowUp")
    { this.editUnqualifiedForm.value.flag='1';
    this.editUnqualifiedForm.value.flagSchedulded='0';
    }else if(this.editUnqualifiedForm.value.markas =="Customer"){
      this.editUnqualifiedForm.value.flag='2';
      this.editUnqualifiedForm.value.flagSchedulded='0';
    } else if(this.editUnqualifiedForm.value.markas =="Unqualified"){
      this.editUnqualifiedForm.value.flag='3';
      this.editUnqualifiedForm.value.flagSchedulded='0';
    }else{
      this.editUnqualifiedForm.value.flag='0';
    }
    this.buttontype = true;
    let Form = JSON.stringify(this.editUnqualifiedForm.value);
    this.leadService.performActioneditUnqualified(this.route.snapshot.params.id,Form).subscribe(
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
