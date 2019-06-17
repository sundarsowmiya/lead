import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LeadService} from '../../../services/lead.service';
import { ToastrService } from 'ngx-toastr';

import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-delete-schedulded',
  templateUrl: './delete-schedulded.component.html',
  styleUrls: ['./delete-schedulded.component.css']
})
export class DeleteScheduldedComponent implements OnInit {
  DeleteScheduldedForm;
  dtOptions;
  dataTable:any;
  administratorAccess;
  adminUser;
  adminAccess;
  constructor(
    private _location: Location, 
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient,
    private leadService: LeadService, f: FormBuilder) { 

      this.DeleteScheduldedForm=f.group({
      });
    }
  
  ngOnInit() {
    this.adminAccess ='Are you sure you want to delete?'

  }

  deleteSchedulded(){
    this.leadService.performActionDeleteSchedulded(this.route.snapshot.params.id).subscribe(
      (response:any)=> {
        this.toastr.info('schedulded'+this.route.snapshot.params.id+ 'deleted');
        $('#datatable-buttons').DataTable().ajax.reload();
        this.backClicked();
      //   if (response.code == 'DL003' || response.code== "" || response.code== null) {
      //     this.toastr.error('Failure to Delete user '+this.route.snapshot.params.id);
      //  }
      //  else {
      //   this.backClicked();
      //   this.toastr.info('schedulded '+this.route.snapshot.params.id+ ' deleted');
      //  $('#datatable-buttons').DataTable().ajax.reload();
      //  }
        
      },
      (error) => console.log(error)
    )    
  }
  backClicked() {
    this.router.navigate(['/dashboard/schedulded']);
}
}

 
