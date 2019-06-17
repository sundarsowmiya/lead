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
  selector: 'app-schedulded',
  templateUrl: './schedulded.component.html',
  styleUrls: ['./schedulded.component.css']
})
export class ScheduldedComponent implements OnInit {

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
         "url": "http://localhost:3000/schedulded",
         "dataSrc": function (json) {
           let myJson = {
             data: []
           };
         //  console.log(json);
           myJson.data.push(json)
           return myJson.data[0];
         }
       },
       columns: [
        { title:'Name', data:'name'},
         { title:'Schdeulded Time', data:'scheduldedTime'},
        { title:'Schedulded Date', data:'scheduldedDate'},
        { title:'Phone Number', data:'phoneNumber'},
        { title:'Email Id', data:'emailId'},
        // { title:'Action', data:'action'},
        {
          title: 'Option',
          data: null,
          className: "thead-light",
          render: function (data, type, row) {
            return `<a schedulded-edit-id="` + data._id + `" data-toggle="modal"  data-target="#full-width-modal" class="btn default btn-xs purple"><i class="mdi mdi-square-edit-outline"></i> Edit </a>
            <a schedulded-delete-id="`+ data._id + `" data-toggle="modal" class="btn default btn-xs black"><i class="mdi mdi-delete"></i> Delete</a>`;
          }
        }
      ]
       
       
     };
 
   }
 
 
   downloadtable():void {
     this.leadsService.performActionDownloadschedulded().subscribe((resources) => {
      this.leadsService.exportAsExcelFile(resources, 'scheduldedDetails');
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
       if (event.target.hasAttribute("schedulded-edit-id")){
         this.router.navigate(["dashboard/schedulded/edit-schedulded/"+ event.target.getAttribute("schedulded-edit-id")], {queryParams:{app:"schedulded"}});
       }if(event.target.hasAttribute("schedulded-delete-id")) {
         this.router.navigate(["dashboard/schedulded/delete-schedulded/"+ event.target.getAttribute("schedulded-delete-id")], {queryParams:{app:"schedulded"}});
       }
     });
     
   }
 
  
 
   addData(){
     this.router.navigate(['dashboard/schedulded/add-schedulded']);
   }
 
   private closeModal(): void {
    // this.backClicked();
     this.closeBtn.nativeElement.click();
 
   }
 
     
    
 
 }
 