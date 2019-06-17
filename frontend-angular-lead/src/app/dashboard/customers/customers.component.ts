import { 
  Component, 
  OnInit, 
  ViewChild,
  AfterViewInit, 
  Renderer, 
  OnDestroy,
  ElementRef,
  Output, EventEmitter,
  ChangeDetectorRef,
  ViewEncapsulation } from '@angular/core';
  import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router, Route, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import * as config from '../../../globalConfig';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { LeadService } from '../../services/lead.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpHeaders={
  headers: new HttpHeaders({'Content-Type': 'application/json' })
}
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
 
   @ViewChild('closeBtn') closeBtn: ElementRef;
   titleHeading = 'Schedulded';
   selectedFile;
   uploadFileData;
   uploadResoucesForm:FormGroup;
   searchResoucesForm:FormGroup;
   dropDownlist:any;;
   spinnerFlag;
   isDisabled = true
   changeText: boolean;
    constructor(private route: ActivatedRoute,
     private router: Router,
     private renderer: Renderer,
     private sharedService: SharedService,
     private http: HttpClient,
     private fb: FormBuilder,
     private chgDt:ChangeDetectorRef,
     private leadsService:LeadService,
     private toastr: ToastrService) {
       this.changeText = false;
       this.uploadResoucesForm = fb.group({
         uploadFileData: ["",[Validators.required]],
       });
       this.uploadFileData = this.uploadResoucesForm.get('uploadFileData');
       this.searchResoucesForm = fb.group({
         applicationName: ["",[Validators.required]],
         domainName: ["",[Validators.required]],
         resourcesid: ["",[Validators.required]],
       });
       
      }
      
      ngOnInit(): void {
 
     // this.resourcesService.getResourcesall().subscribe((response:any) =>{
     //   this.resourcesNameLists = response.map(res => res.resourceID)
    
     //    });
 
      this.sharedService.currentData.subscribe((data) => {
       if(data){
         console.log(data, "Service change");
       }
     }) 
     
     this.dtOptions = {
       ajax: {
         "url": "http://localhost:3000/customers",
         "dataSrc": function (json) {
           let myJson = {
             data: []
           };
           
           myJson.data.push(json)
           return myJson.data[0];
         }
       },
       columns: [
        { title:'Name', data:'name'},
        { title:'Phone Numbe', data:'phoneNumber'},
        { title:'Email Id', data:'emailId'},
        { title:'Organization', data:'organization'},
        // { title:'Action', data:'action'},
        {
          title: 'Option',
          data: null,
          className: "thead-light",
          render: function (data, type, row) {
            return `<a customers-edit-id="` + data._id + `" data-toggle="modal"  data-target="#full-width-modal" class="btn default btn-xs purple"><i class="mdi mdi-square-edit-outline"></i> Edit </a>
            <a customers-delete-id="`+ data._id + `" data-toggle="modal" class="btn default btn-xs black"><i class="mdi mdi-delete"></i> Delete</a>`;
          }
        }
      ]
       
       
     };
 
   }
 
 
   downloadtable():void {
     this.leadsService.performActionDownloadsCustomers().subscribe((resources) => {
      this.leadsService.exportAsExcelFile(resources, 'customersDetails');
      });
  }
 
  onUploadChanged(event) {
   this.isDisabled = false
   this.selectedFile = event.target.files[0]; 
 }
 
 // uploadData() {
 //  this.spinnerFlag = true;
 //  const uploadFileData = new FormData();
 //  uploadFileData.append('uploadFileData', this.selectedFile, this.selectedFile.name);  
    
 //   this.leadService.uploadDocument(uploadFileData).subscribe(
 //     (response:any)=> {
 //     this.spinnerFlag = false;
 //     $('#datatable-buttons').DataTable().ajax.reload();;
 //     this.uploadResoucesForm.reset();
 //     this.closeModal();
 //     this.toastr.info(response.message);
 //     },
 //     error => {this.spinnerFlag = false; this.toastr.error(error);}
 //   )
 // }
 
   ngAfterViewInit(): void {
     this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
       dtInstance.columns().every(function () {
         const that = this;
         $('input', this.footer()).on('keyup change', function () {
           if (that.search() !== this['value']) {
             that
               .search(this['value'])
               .draw();
           }
         });
       });
     });
 
     this.renderer.listenGlobal('document', 'click', (event) => {
       if (event.target.hasAttribute("customers-edit-id")){
         this.router.navigate(["dashboard/customers/edit-customers/"+ event.target.getAttribute("customers-edit-id")], {queryParams:{app:"customers"}});
       }if(event.target.hasAttribute("customers-delete-id")) {
         this.router.navigate(["dashboard/customers/delete-customers/"+ event.target.getAttribute("customers-delete-id")], {queryParams:{app:"customers"}});
       }
     });
     
   }
 
  
 
   addData(){
     this.router.navigate(['dashboard/customers/add-customers']);
   }
 
   private closeModal(): void {
    // this.backClicked();
     this.closeBtn.nativeElement.click();
 
   }
 
     

}
