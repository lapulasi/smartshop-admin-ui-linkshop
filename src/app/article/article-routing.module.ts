import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArticleEditComponent} from "./article-edit/article-edit.component";
import {ArticleListComponent} from "./article-list/article-list.component";

const routes: Routes = [
  {
    path: 'edit',
    component: ArticleEditComponent
  },
  {
    path: 'list',
    component: ArticleListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
