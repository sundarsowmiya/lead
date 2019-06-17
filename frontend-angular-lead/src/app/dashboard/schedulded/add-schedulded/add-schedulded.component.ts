import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Route, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ResourcesService } from '../../../services/resources.service';
import { CalendarModule } from 'primeng/calendar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-schedulded',
  templateUrl: './add-schedulded.component.html',
  styleUrls: ['./add-schedulded.component.css']
})
export class AddScheduldedComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  modal;
  addScheduldedForm: FormGroup;
  name;
  PhoneNumber;
  EmailId;
  organization;
  Scheduldedtime;
  assignTo;
  dateOfHire;
  leadstatus;
  remarks;

  IsmodelShow: any;
  submitted = false;
  tData: any;
  value: Date;

  constructor(
    private _location: Location,
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private chgDt: ChangeDetectorRef,
    private resourcesService: ResourcesService) {
    this.addScheduldedForm = this.fb.group({
      EmailId: ["", [Validators.required]],
      assignTo: ["", [Validators.required]],
      name: ["", [Validators.required]],
      PhoneNumber: ["", [Validators.required]],
      organization: ["", [Validators.required]],
      Scheduldedtime: ["", [Validators.required]],
      leadstatus: ["", [Validators.required]],
      remarks: ["", [Validators.required]],
      dateOfHire: ["", [Validators.required]],
    })
    this.EmailId = this.addScheduldedForm.get('EmailId');
    this.assignTo = this.addScheduldedForm.get('assignTo');
    this.name = this.addScheduldedForm.get('name');
    this.PhoneNumber = this.addScheduldedForm.get('PhoneNumber');
    this.organization = this.addScheduldedForm.get('organization');
    this.Scheduldedtime = this.addScheduldedForm.get('Scheduldedtime');
    this.leadstatus = this.addScheduldedForm.get('leadstatus');
    this.remarks = this.addScheduldedForm.get('remarks');
    this.dateOfHire = this.addScheduldedForm.get('dateOfHire');
  }


  ngOnInit() {
    this.chgDt.detectChanges();
  }
  get f() { return this.addScheduldedForm.controls; }
  backClicked() {
   // this._location.back();
   this.router.navigate(['/dashboard/schedulded']);
  }

  addschedulded() {
    this.submitted = true;
    this.addScheduldedForm.value.dateOfHire = new DatePipe('en-US').transform(this.addScheduldedForm.value.dateOfHire, 'MM/dd/yyyy')
    console.log(this.addScheduldedForm.value.dateOfHire);
    // this.addScheduldedForm.value.dateOfHire = this.addScheduldedForm.value.dateOfHire.toLocaleDateString();
    if (this.addScheduldedForm.invalid) {
      return;
    }
    console.log(this.addScheduldedForm.value);
    this.resourcesService.addresouces(this.addScheduldedForm.value).subscribe(
      (response: any) => {
        this.closeModal();
        //this.fetchTableData();

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

}
