import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../article-service";

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {

  protected  config: any= {
    extraPlugins: 'divarea',
    uiColor: '#F8F8F8',   // 编辑框背景色
    language: 'zh-cn',  // 显示语言
    toolbarCanCollapse: true,  // 是否可收缩功能栏
    toolbar: [
      ['Maximize'],
      ['Undo', 'Redo', '-', 'Cut', ' Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Link', 'Unlink', 'Anchor', '-', 'Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', '-', 'Source'],
      ['Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript', '-', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote'],
      ['Styles', 'Format', 'Font', 'FontSize'] ]  // 工具部分
  };
  article = {id: new Date().getTime(), title: '', author: '', content: '', type: '', description: '', status: 0};

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      if(queryParams.id) {
        const id = queryParams.id;
        this.articleService.articleInfo(id).subscribe(data => {
          this.article = data;
          console.log(this.article.content);
        });
      }
    });
  }

  save() {
    if(!this.article.title) {
      alert('请输入文章标题！');
      return false;
    }else if(!this.article.author) {
      alert('请输入文章作者！');
      return false;
    }else if(!this.article.content) {
      alert('请输入文章内容！');
      return false;
    }else if(!this.article.type) {
      alert('请输入选择类型！');
      return false;
    }

    this.articleService.articleEdit(this.article).subscribe(result => {
      if(result.content === 'SUCCESS') {
        alert('保存成功！');
      }
    });


  }

}
