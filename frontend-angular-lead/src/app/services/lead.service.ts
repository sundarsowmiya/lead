import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import * as config from '../../globalConfig';
import { LeadTypes } from '../types/leads.type';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const httpHeaders={
    headers: new HttpHeaders({'Content-Type': 'application/json' })
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Injectable({
    providedIn: 'root'
})

export class LeadService{
   
    public exportAsExcelFile(json: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
      }

      private saveAsExcelFile(buffer: any, fileName: string): void {
       const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
       FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
     }

    //leadsAPIurlGet: any = "../../assets/images/data.json";
    //leadsAPIgetall=config.gServiceUrl+"/leads";
    leadsAPICreateLeads=config.gServiceUrl+"leads";
    leadsAPICreateschedulded=config.gServiceUrl+"schedulded";
    leadsAPICreatefollowup=config.gServiceUrl+"followup";
    leadsAPICreateCustomers=config.gServiceUrl+"customers";
    leadsAPICreateunqualified=config.gServiceUrl+"unqualified";

    leadsAPILeadsCount=config.gServiceUrl+"leadsCount";
    leadsAPICustomersCount=config.gServiceUrl+"customersCount";
    leadsAPIUnqualfiedCount=config.gServiceUrl+"unqualfiedCount";
    leadsAPIFollowupCount=config.gServiceUrl+"followupCount";

    
    constructor(private http: HttpClient) { }

    // loginCheck(data):Observable<LoginType[]>{
    //     return this.http.post<LoginType[]>(this.loginUrl,data,httpHeaders)
    // }
    performActionDownloadLeads(): Observable<LeadTypes[]>{
        return this.http.get<LeadTypes[]>(this.leadsAPICreateLeads);
    }
    performActionAddleads(data): Observable<LeadTypes[]>{
        return this.http.post<LeadTypes[]>(this.leadsAPICreateLeads,data,httpHeaders);
    }
    performActionEditLeads(id:number): Observable<LeadTypes[]>{
        return this.http.get<LeadTypes[]>(this.leadsAPICreateLeads+"/"+id);
    }
    performActioneditLead(id:number, data): Observable<LeadTypes[]>{
        return this.http.put<LeadTypes[]>(this.leadsAPICreateLeads+"/"+id,data,httpHeaders);
    }
    performActionDeleteleads(id:number): Observable<LeadTypes[]>{
        return this.http.delete<LeadTypes[]>(this.leadsAPICreateLeads+"/"+id);
    }

/////////////////----schedulded-----////////////////////////

    performActionDownloadschedulded(): Observable<LeadTypes[]>{
        return this.http.get<LeadTypes[]>(this.leadsAPICreateschedulded);
    }
    performActionEditSchedulded(id:number): Observable<LeadTypes[]>{
        return this.http.get<LeadTypes[]>(this.leadsAPICreateschedulded+"/"+id);
    }
    performActioneditSchedulded(id:number, data): Observable<LeadTypes[]>{
        return this.http.put<LeadTypes[]>(this.leadsAPICreateschedulded+"/"+id,data,httpHeaders);
    }
    performActionDeleteSchedulded(id:number): Observable<LeadTypes[]>{
        return this.http.delete<LeadTypes[]>(this.leadsAPICreateschedulded+"/"+id);
    }
/////////////-----Followup-------------/////////////////
   
    performActionDownloadsFollowup(): Observable<LeadTypes[]>{
        return this.http.get<LeadTypes[]>(this.leadsAPICreatefollowup);
    }
    performActionEditFollowup(id:number): Observable<LeadTypes[]>{
        return this.http.get<LeadTypes[]>(this.leadsAPICreatefollowup+"/"+id);
    }
    performActioneditFollowup(id:number, data): Observable<LeadTypes[]>{
        return this.http.put<LeadTypes[]>(this.leadsAPICreatefollowup+"/"+id,data,httpHeaders);
    }
    performActionDeleteFollowup(id:number): Observable<LeadTypes[]>{
        return this.http.delete<LeadTypes[]>(this.leadsAPICreatefollowup+"/"+id);
    }

    /////////////-----Customers-------------/////////////////


    performActionDownloadsCustomers(): Observable<LeadTypes[]>{
        return this.http.get<LeadTypes[]>(this.leadsAPICreateCustomers);
    }
    performActionEditCustomers(id:number): Observable<LeadTypes[]>{
        return this.http.get<LeadTypes[]>(this.leadsAPICreateCustomers+"/"+id);
    }
    performActioneditCustomers(id:number, data): Observable<LeadTypes[]>{
        return this.http.put<LeadTypes[]>(this.leadsAPICreateCustomers+"/"+id,data,httpHeaders);
    }
    performActionDeleteCustomer(id:number): Observable<LeadTypes[]>{
        return this.http.delete<LeadTypes[]>(this.leadsAPICreateCustomers+"/"+id);
    }

/////////////-----Unqualified-------------/////////////////
 
    
    performActionDownloadsUnqualified(): Observable<LeadTypes[]>{
        return this.http.get<LeadTypes[]>(this.leadsAPICreateunqualified);
    }
    performActionEditUnqualified(id:number): Observable<LeadTypes[]>{
        return this.http.get<LeadTypes[]>(this.leadsAPICreateunqualified+"/"+id);
    }
    performActioneditUnqualified(id:number, data): Observable<LeadTypes[]>{
        return this.http.put<LeadTypes[]>(this.leadsAPICreateunqualified+"/"+id,data,httpHeaders);
    }
    performActionDeleteUnqualified(id:number): Observable<LeadTypes[]>{
        return this.http.delete<LeadTypes[]>(this.leadsAPICreateunqualified+"/"+id);
    }


    
    performActionLeadsCount(): Observable<LeadTypes[]>{
        return this.http.get<LeadTypes[]>(this.leadsAPILeadsCount);
    }
    performActionCustomersCount(): Observable<LeadTypes[]>{
        return this.http.get<LeadTypes[]>(this.leadsAPICustomersCount);
    }
    performActionUnqualfiedCount(): Observable<LeadTypes[]>{
        return this.http.get<LeadTypes[]>(this.leadsAPIUnqualfiedCount);
    }
    performActionFollowupCount(): Observable<LeadTypes[]>{
        return this.http.get<LeadTypes[]>(this.leadsAPIFollowupCount,httpHeaders);
    }
    
     

}