import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2'
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
      } else {
        this.appService.notifySuccess(resp.message)
      }

    }, (error: any) => {
      this.appService.spinnerUpdate('hide')
      if (error.error.message) {
        this.appService.notifyError(error.error.message)
        // this.appService.notifyTost(error.error.message,'error')
      } else {
        this.appService.notifyError(error.statusText)
      }
    })

  }
  newCategory(inputValue: any = '') {

    (async () => {
      let CategoryObj = {
        id: "",
        parent_id: 0,
        name: "",
        child: []
      }
      const { value: NewCategory } = await Swal.fire({
        title: 'Enter Category',
        input: 'text',
        inputValue: (inputValue) ? inputValue : "",
        confirmButtonColor: "#2dce89",
        confirmButtonText: 'Save',
        inputPlaceholder: 'Category Name',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Please Input catgeory name!'
          }
        }
      })
      if (NewCategory) {
        this.appService.spinnerUpdate('show')
        this.appService.saveCategory({ name: NewCategory, parent_id: 0 }).subscribe((resp: any) => {
          this.appService.spinnerUpdate('hide')
          this.appService.notifySuccess(resp.message)
          CategoryObj.name = NewCategory
          CategoryObj.id = resp.data.insertId
          this.categoryTree.push(CategoryObj)

        }, (error: any) => {
          this.appService.spinnerUpdate('hide')
          if (error.error.message) {
            this.appService.notifyErrormessage(error.error.message)
            // this.appService.notifyTost(error.error.message,'error')
          } else {
            this.appService.notifyErrormessage(error.statusText)
          }
          this.newCategory(NewCategory)
        })
      }
    })()


  }


}
