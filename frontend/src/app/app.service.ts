
import { Injectable } from '@angular/core';
// import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from "./../environments/environment"
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class AppService {
  loginCode: any
  loginData: any
  reportId: any
  loginStatus: boolean = false
  Toast: any
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) {
    /**
     * Toast Initialization
     */
    this.Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

  }

  /**
   * 
   * spinner loading function
   * @param status : show | hide
   * 
   */
  spinnerUpdate(status: any) {

    if (status == 'show') {
      this.spinner.show();
    } else if (status == 'hide') {
      this.spinner.hide();
    }

  }

  /**
   * 
   * Error Toast Method
   * 
   * @param message 
   * @param from 
   * @param align 
   */
  notifyError(message: any, from: any = 'top', align: any = "right",) {
    this.Toast.fire({
      icon: 'error',
      title: message
    })
  }
  notifyErrormessage(message: any, from: any = 'top', align: any = "right",) {
    this.toastr.warning(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + message + '</span>',
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
  /**
   * Success Toast Method
   * @param message 
   * @param from 
   * @param align 
   */
  notifySuccess(message: any, from: any = 'top', align: any = "right",) {
    this.Toast.fire({
      icon: 'success',
      title: message
    })
  }

  /**
   *  fetch all category http Request
   * @returns Observable
   */
  fetchCategory(): Observable<any> {
    // return "";
    return this.http.get(`${environment.base_URL}category`)

  }
  /**
   *  Delete category http Request
   * @returns Observable
   */

  deleteCategory(categoryId: any): Observable<any> {
    return this.http.delete(`${environment.base_URL}category/${categoryId}`)
  }
  /**
   *  create new category http Request
   * @returns Observable
   */
  saveCategory(categoryPayload: any) {
    return this.http.post(`${environment.base_URL}category`, categoryPayload)
  }
  /**
   *  Update category http Request
   * @returns Observable
   */
  updateCategory(categoryPayload: any) {
    return this.http.put(`${environment.base_URL}category`, categoryPayload)
  }

}

