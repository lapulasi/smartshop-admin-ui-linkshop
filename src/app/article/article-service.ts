import {Injectable} from "@angular/core";
import {AdminHttpClient} from "../admin.httpclient";

@Injectable()
export class ArticleService {
  constructor(private http: AdminHttpClient) {}

  articleInfo(id: any) {
    return this.http.get(`/org/article/info/${id}`, null);
  }

  articleEdit(article: any) {
    return this.http.post<any>(`/org/article/edit`, article);
  }

  articleList(title: any, author: any, page: any) {
    return this.http.get(`/org/article/page`, {title: title, author: author, page: page});
  }

  articlePublish(id: any) {
    return this.http.put<any>(`/org/article/publish/${id}`, null);
  }



}
