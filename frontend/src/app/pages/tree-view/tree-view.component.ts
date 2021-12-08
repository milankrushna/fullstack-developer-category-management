import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';

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

    let categoryId = dt.id
    // let categoryName = dt.name
    // console.log(index);

    // console.log(totalData);
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

  addCategory(dt: any, i: any) {
    this.dispalyNre = !this.dispalyNre
    this.parentId = dt.id

  }

  saveCategory() {
    this.appService.spinnerUpdate('show')
    this.appService.saveCategory({ name: this.newCategory, parent_id: this.parentId }).subscribe((resp: any) => {
      this.appService.spinnerUpdate('hide')
      this.appService.notifySuccess(resp.message)
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

}


