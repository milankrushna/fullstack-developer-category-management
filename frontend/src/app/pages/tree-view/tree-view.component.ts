import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
  providers: [AppService]
})
export class TreeViewComponent implements OnInit {
  @Input() data: any;
  dispalyNre: boolean = false
  newCategory: any
  parentId: any;
  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {

  }


  removeCategory(dt: any, index: any, totalData: any) {

    /**
     * Delete confirmation Toast
     */
    Swal.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        /**
         * On confirmation call Delete method
         */

        let categoryId = dt.id
        this.appService.spinnerUpdate('show')
        this.appService.deleteCategory(categoryId).subscribe((resp: any) => {
          this.appService.spinnerUpdate('hide')
          this.appService.notifySuccess(resp.message)
          totalData.splice(index, 1)
        }, (error: any) => {
          console.log(error);

          this.appService.spinnerUpdate('hide')
          if (error.error.message) {
            this.appService.notifyError(error.error.message)
            // this.appService.notifyTost(error.error.message,'error')
          } else {
            this.appService.notifyError(error.statusText)
          }
        })

      }
    })

  }

  /**
   * New category Function
   * @param dt 
   * @param i 
   * @param inputValue 
   */
  addCategory(dt: any, i: any, inputValue: any = '') {

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
        inputLabel: `Parent Catgeory : ${dt.name}`,
        inputPlaceholder: 'Category Name',
        confirmButtonColor: "#2dce89",
        confirmButtonText: 'Save',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Please Input catgeory name!'
          }
        }
      })

      if (NewCategory) {

        /**
         * On save create Category call create category
         */
        this.appService.spinnerUpdate('show')
        this.appService.saveCategory({ name: NewCategory, parent_id: dt.id }).subscribe((resp: any) => {
          this.appService.spinnerUpdate('hide')
          this.appService.notifySuccess(resp.message)
          CategoryObj.name = NewCategory
          CategoryObj.id = resp.data.insertId
          dt.child.push(CategoryObj)

        }, (error: any) => {
          this.appService.spinnerUpdate('hide')
          console.log(error.error.message);

          if (error.error.message) {
            this.appService.notifyErrormessage(error.error.message)
            // this.appService.notifyTost(error.error.message,'error')
          } else {
            this.appService.notifyErrormessage(error.statusText)
          }
          this.addCategory(dt, i, NewCategory)
        })

      }

    })()
  }

  /**
   *  Update Category Method
   * 
   * @param dt 
   * @param i 
   * @param inputValue 
   */
  updateCategory(dt: any, i: any, inputValue: any = '') {

    (async () => {
      let CategoryObj = dt
      const { value: NewCategory } = await Swal.fire({
        title: 'Enter Updated Category',
        input: 'text',
        confirmButtonColor: "#2dce89",
        confirmButtonText: 'Update',
        inputValue: (inputValue) ? inputValue : dt.name,
        inputPlaceholder: 'Category Name',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Please Input catgeory name!'
          }
        }
      })

      if (NewCategory) {
        /**
         * On Update Update Category call create category
         */
        this.appService.spinnerUpdate('show')
        this.appService.updateCategory({ name: NewCategory, id: dt.id }).subscribe((resp: any) => {
          this.appService.spinnerUpdate('hide')
          this.appService.notifySuccess(resp.message)
          CategoryObj.name = NewCategory
          // CategoryObj.id = resp.data.insertId
          // dt.child.push(CategoryObj)

        }, (error: any) => {
          this.appService.spinnerUpdate('hide')
          if (error.error.message) {
            this.appService.notifyErrormessage(error.error.message)
            // this.appService.notifyTost(error.error.message,'error')
          } else {
            this.appService.notifyErrormessage(error.statusText)
          }
          this.addCategory(dt, i, NewCategory)
        })

      }

    })()

  }

}


