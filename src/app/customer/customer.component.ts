import {Component, OnInit, TemplateRef} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  templateUrl: './customer.html'
})
export class CustomerComponent implements OnInit {

  currPage: any = 0;
  totalItems: any;
  content: any;
  modalRef: BsModalRef;
  selectedId: any;
  remark: any;

  constructor(private http: HttpClient, private modalService: BsModalService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<any>('/org/user/customer/page', {params: new HttpParams().set('page', this.currPage)}).subscribe(data => {
      this.content = data.content;
      this.totalItems = data.totalElements;
    });
  }

  pageChanged(event) {
    this.currPage = event.page - 1;
    this.loadData();
  }

  openModal(template: TemplateRef<any>, id, remark) {
    this.selectedId = id;
    this.remark = remark;
    this.modalRef = this.modalService.show(template);
  }

  submit() {
    console.log(this.selectedId, this.remark);
    this.http.put<any>('/org/user/customer/edit', null, {params: new HttpParams().set('id', this.selectedId).set('remark', this.remark)}).subscribe(data => {
      if(data && data.result === 'success') {
        this.modalRef.hide();
        this.loadData();
      }else {
        alert('操作失败，请联系管理员！');
      }
    });

  }

}
