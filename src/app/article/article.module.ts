import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import {CKEditorModule} from "ng2-ckeditor";
import {FormsModule} from "@angular/forms";
import {ArticleService} from "./article-service";
import {AdminHttpClient} from "../admin.httpclient";
import { ArticleListComponent } from './article-list/article-list.component';
import {PaginationModule} from "ngx-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    ArticleRoutingModule,
    FormsModule,
    CKEditorModule,
    PaginationModule.forRoot(),
  ],
  declarations: [ArticleEditComponent, ArticleListComponent],
  providers: [AdminHttpClient, ArticleService]
})
export class ArticleModule { }
