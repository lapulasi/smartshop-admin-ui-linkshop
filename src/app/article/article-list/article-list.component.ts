import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../article-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit {

  title: String = '';
  author: String = '';

  // totalItems: any;
  // pageSize: any;
  page = 0;

  result: any;

  constructor(private articleService: ArticleService, private router: Router) { }

  ngOnInit() {
    this.query();
  }

  pageChanged(event: any) {
    this.page = event.page - 1;
    this.query();
  }

  query() {
    this.articleService.articleList(this.title, this.author, this.page).subscribe(result => {
      this.result = result;
      // console.log(this.result);
    });
  }

  gotoEdit(articleId: any) {

    this.router.navigate([`/article/edit`], {queryParams: {id: articleId}});
  }

  publishArticle(articleId: any) {
    this.articleService.articlePublish(articleId).subscribe(data => {
      if(data.content === 'SUCCESS') {
        this.query();
      }
    });
  }


}
