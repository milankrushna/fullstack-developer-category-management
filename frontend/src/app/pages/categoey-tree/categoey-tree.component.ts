import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-categoey-tree',
  templateUrl: './categoey-tree.component.html',
  styleUrls: ['./categoey-tree.component.scss'],
  providers: [AppService]
})
export class CategoryTreeComponent implements OnInit {

  categoryTree: any = ''

  constructor(
    public appService: AppService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.fetchCategory()

  }


  fetchCategory() {
    this.spinner.show();

    this.appService.fetchCategory().subscribe(resp => {
      this.spinner.hide();

      if (resp.status == 1) {
        this.categoryTree = resp.data
      }else{
        this.appService.notifySuccess(resp.message)
      }

    },(error:any)=>{
      this.appService.spinnerUpdate('hide')
      if (error.error.message) {
        this.appService.notifyError(error.error.message)
        // this.appService.notifyTost(error.error.message,'error')
      } else {
        this.appService.notifyError(error.statusText)
      }
    })

  }


}
