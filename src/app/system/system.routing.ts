import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {FaceContrastComponent} from './faceContrast/faceContrast.component';
import {AttrRecognitionComponent} from './attrRecognition/attrRecognition.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'system'
    },
    children: [
      {
        path: 'faceCompare',
        component: FaceContrastComponent,
        data: {
          title: 'faceCompare'
        }
      },
      {
        path: 'attrRecognition',
        component: AttrRecognitionComponent,
        data: {
          title: 'attrRecognition'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
