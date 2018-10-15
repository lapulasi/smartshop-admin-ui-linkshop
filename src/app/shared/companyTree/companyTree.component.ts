import {Component, Input, Output, EventEmitter, OnInit, OnChanges} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ShareService} from "../share.service";
import {OrgService} from "../../organization/orgService";

declare var $: any;

@Component({
  selector: 'app-company-tree',
  templateUrl: './companyTree.html',
  styles:['.hide{display: none}']
})

export class CompanyTreeComponent implements OnInit, OnChanges {
  companyList: any;
  @Input() onlySelectShop: any;
  @Input() company: any;
  @Input() staticModal: any;
  @Output() change = new EventEmitter();
  companyName: any;
  treeData: any;

  constructor(private service: ShareService, private orgService: OrgService) {
  }

  ngOnInit() {
    $('.tree').on('click', 'li.parent_li > span', function (e) {

      var children = $(this).parent('li.parent_li').find(' > ul > li');
      if (children.is(':visible')) {

        children.hide('fast');

        $(this).attr('title', 'Expand this branch').find(' > i').addClass('fa-folder-o').removeClass('fa-folder-open-o');

      } else {

        children.show('fast');

        $(this).attr('title', 'Collapse this branch').find(' > i').addClass('fa-folder-open-o').removeClass('fa-folder-o');

      }

      e.stopPropagation();

    });
  }

  ngOnChanges() {
    // console.log(this.company);
    if (this.company !== undefined && this.company !== '') {
      this.getOrgTree();
    }

  }

  getOrgTree() {
    this.orgService.getOrgTree_({companyId: this.company}).subscribe(data => {
      // console.log('getOrgTree==' + JSON.stringify(data, null, 4));
      if (data.length !== 0) {
        this.treeData = data[0];
      }
    })
  }

  choose(item) {
    this.change.emit(item);
    this.staticModal.hide();
  }
}
