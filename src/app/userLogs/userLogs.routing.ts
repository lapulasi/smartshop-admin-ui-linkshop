import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageViewsComponent} from "./pageViews/pageViews.component";
import {EventViewsComponent} from "./eventViews/eventViews.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'userLogs'
    },
    children: [
      {
        path: 'pageView',
        component: PageViewsComponent,
        data: {
          title: 'pageView'
        }
      },
      {
        path: 'eventView',
        component: EventViewsComponent,
        data: {
          title: 'eventView'
        }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserLogsRouting {
}
