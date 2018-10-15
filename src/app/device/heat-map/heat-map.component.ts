import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { Contant } from '../../common/Contant';

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.scss']
})
export class HeatMapComponent implements OnInit {

  heatMapBg$: Observable<any>;
  imgPrefix;

  @ViewChild('fileInput') fileInput;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private contant: Contant) {
    this.imgPrefix = contant.imgPrefix;
  }

  ngOnInit() {
    this.heatMapBg$ = this.route.paramMap.switchMap((params: ParamMap) => {
      return this.http.get(`/device/${params.get('deviceUID')}`);
    });
  }

  uploadHeatMapBg() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append('image', fileBrowser.files[0]);
      this.http.post(`/device/upload/heatMapBg/${this.route.snapshot.paramMap.get('deviceUID')}`, formData)
        .subscribe(() => {
          location.reload();
        });
    }
  }

}
