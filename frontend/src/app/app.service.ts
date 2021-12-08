
import { Injectable } from '@angular/core';
// import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from "./../environments/environment"
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
@Injectable({
  providedIn: 'root'
})
export class AppService {
  loginCode:any
  loginData:any
  reportId:any
  loginStatus:boolean = false
  constructor(
    private http : HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    ) { }


    spinnerUpdate(status:any){

      if(status == 'show'){
        this.spinner.show();
      }else if(status == 'hide'){
        this.spinner.hide();
      }

    }

    notifyError(message:any,from:any='top',align:any="right",){
      this.toastr.warning(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+message+'</span>',
          "",
          {
            timeOut: 10000,
            enableHtml: true,
            closeButton: false,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
    }
    notifySuccess(message:any,from:any='top',align:any="right",){
      this.toastr.success(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+message+'</span>',
          "",
          {
            timeOut: 7000,
            enableHtml: true,
            closeButton: false,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
    }

  fetchCategory():Observable<any>{
    // return "";
    return this.http.get(`${environment.base_URL}category`)

  }

  deleteCategory(categoryId:any):Observable<any>{
      return this.http.delete(`${environment.base_URL}category/${categoryId}`)
  }

  saveCategory(categoryPayload:any){
    return this.http.post(`${environment.base_URL}category`,categoryPayload)
  }

}

