import {DateTimeFormatter, LocalDate, LocalDateTime} from 'js-joda';

declare const h337: any;

import {
  AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import * as $ from 'jquery';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {HeatMap} from './heat-map';
import 'slick-carousel';
import * as noUiSlider from 'nouislider';
import * as uuid from 'uuid/v4';
import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'app-heat-map',
  template:`<div class="map-one">
    <div #contrainer [id]="heatMapId" style="height: 480px;width: 640px">
      <div *ngFor="let device of deviceList" #heatMap style="height: 480px;width: 640px"
           id="{{heatMapId}}-{{device['uid']}}-{{type}}-{{date}}"  class="heat-map-slide" >
        <img src="{{heatMapBg(device)}}" style="width: 100%;margin: 0px;height: 100%">
      </div>
    </div>
    <span>{{gradientValues}}</span>
    <div class="progress_custom">
      <p>值域</p>
      <div [id]="valueThresholdSliderId()" class="progress-bar"></div>
    </div>

    <div class="progress_custom">
      <p>透明度</p>
      <div [id]="opacityRangeSliderId()" class="progress-bar">
      </div>
    </div>
  </div>
  `
})
// TODO 后面再重构
export class HeatMapComponent implements OnInit, AfterViewInit,OnChanges {

  heatMapId = 'heatMap-' + uuid();

  // 摄像头uid列表
  deviceList: Array<any>;

  // 热力图是按照“月”,“周”,“天”展示数据
  public type = 'day';

  @Input() org;

  _shopId;

  @Input()
  set shopId(shopId: number) {
    this._shopId = shopId;
    // this.init();
  }

  get shopId(): number {
    return this._shopId;
  }


  @Input() beginDate = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);

  @Input() endDate = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);

  @Input() beginHour: number;
  @Input() endHour: number;

  private _date;

  gradientValues = [];

  // 查询热力图数据开始时间
  set date(date: any) {
    this._date = date;
  }

  get date() {
    return this._date || LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);
  }

  /**
   * 轮播板当前显示的板块
   */
  private _current_slide;

  @ViewChild('contrainer') contrainer: ElementRef;

  @ViewChildren('heatMap') elements: QueryList<ElementRef>;

  // 一个字典，存储当前component里所有的热力图,key:deviceUID,value:HeatMap
  heatMaps = new Map<string, HeatMap>();

  constructor(private http: HttpClient, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.ref.detectChanges();
    this._createValueThresholdNoUiSlider();
    this._createOpacityRangeNoUiSlider();

    // TODO 添加响应函数这里可能会有问题
    this._addValueThresholdHandler();
    this._addOpacityRangeHandler();
    // this._requestDeviceUIDList().subscribe((deviceList: Array<any>) => {
    //   this.deviceList = deviceList;
    //   this.ref.detectChanges();
    //
    //   // 每隔一分钟刷新数据
    //   TimerObservable.create(0, 6000)
    //     .subscribe().add(this.loadData());
    // });
  }

  private loadData(): void {
    this.heatMaps = new Map<string, HeatMap>();
    this._requestDeviceUIDList().subscribe((deviceList: Array<any>) => {
      this.deviceList = deviceList;
      this.ref.detectChanges();
      this._createSliderCarousel();
      this.http.get(`/device/shop/${this.shopId}/guestPositions/v2/time?beginDate=${this.beginDate}&endDate=${this.endDate}&beginHour=${this.beginHour}&endHour=${this.endHour}`)
        .subscribe((data: Array<any>) => {
          /**
           * 从后端获得数据后
           * 1.为每个deviceUID生成一张热力图
           * 2.设置第一张热力图对应的值域滑动条range value
           * 3.为值域滑动条和透明度滑动条添加响应函数，当滑动条滑动时，相应的更新热力图
           */
          this._aggregation(data).forEach(d => {
            const e = this.elements.find(item => {
              return item.nativeElement.id === `${this.heatMapId}-${d['deviceUID']}-${this.type}-${this.date}`;
            });
            if (e) {
              const oldHeatMap = this.heatMaps.get(e.nativeElement.id);
              if (oldHeatMap != null) {
                oldHeatMap.destory();
              }

              this.heatMaps.set(e.nativeElement.id , new HeatMap(this.type, e.nativeElement, d['positions'] || []));

            }
            // 获得数据后设置第一个热力图对应的值域滑动条的range value
            const extremaValues = this.heatMaps.values().next().value.getExtremaValues();
            this._updateHeatMapExtremaValues(extremaValues);

          });
        });
    });

  }

  reLoad(shopId: number, beginTime: LocalDateTime, endTime: LocalDateTime) {

    this.shopId = shopId;
    this.beginDate = beginTime.format(DateTimeFormatter.ISO_LOCAL_DATE);
    this.endDate = endTime.format(DateTimeFormatter.ISO_LOCAL_DATE);
    this.beginHour = beginTime.hour();
    this.endHour = endTime.hour();
    this.loadData();
  }

  /**
   * 使用slick-carousel jquery插件
   */
  ngAfterViewInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {

  }


  _requestDeviceUIDList() {
    return this.http.get(`/device?shopId=${this.shopId}&type=VIEW`);
  }


  /**
   * 创建值域滑动条
   * @private
   */
  _createValueThresholdNoUiSlider() {
    noUiSlider.create(document.getElementById(this.valueThresholdSliderId()),
      <noUiSlider.Options>
        {
          start: [0, 1],
          step: 1,
          tooltips: [true, true],
          format: {
            to: function (value) {
              return Math.ceil(value);
            },
            from: function (value) {
              return Math.ceil(value);
            }
          },
          connect: true,
          range: {
            'min': [0],
            'max': [1]
          }
        });

  }



  valueThresholdSliderId() {
    return this.heatMapId + '-valueThresholdRangeSlider';
  }

  /**
   * 创建透明度滑动条
   * @private
   */
  _createOpacityRangeNoUiSlider() {
    noUiSlider.create(document.getElementById(this.opacityRangeSliderId()),
      <noUiSlider.Options>
        { start: 0.8,
          step: 0.1,
          tooltips: [true],
          connect: [true, false],
          range: {
            'min': [ 0.2 ],
            'max': [ 1 ]
          }});
  }

  opacityRangeSliderId() {
    return this.heatMapId + '-opacityRangeSlider';
  }



  /**
   * 添加值域滑动条响应函数
   * @private
   */
  _addValueThresholdHandler() {

    document.getElementById(this.valueThresholdSliderId())['noUiSlider'].on('update', (values, handle) => {
      if(this.contrainer.nativeElement) {
        this._current_slide = $(this.contrainer.nativeElement).slick('slickCurrentSlide');
        const slider = $(`#${this.heatMapId} .heat-map-slide[id!=""]`).get(this._current_slide);
        if(slider) {
          const id = slider.getAttribute('id');
          const heatMap = this.heatMaps.get(id);
          if (heatMap != null) {
            heatMap.setRenderThreshold(values[0], values[1]);
            this._updateGradientValues({min:values[0],max:values[1]});
          }
        }

      }

    });
  }

  /**
   * 添加透明度滑动条响应函数
   * @private
   */
  _addOpacityRangeHandler() {
    document.getElementById(this.opacityRangeSliderId())['noUiSlider'].on('update', (values, handle ) => {
      this._current_slide = $(this.contrainer.nativeElement).slick('slickCurrentSlide');
      // this._current_slide = 0;
      const slider = $(`#${this.heatMapId} .heat-map-slide[id!=""]`).get(this._current_slide );
      if(slider) {
        const id = slider.getAttribute('id');
        const heatMap = this.heatMaps.get(id);
        if (heatMap != null) {
          heatMap.setOpacity(values[0]);
        }
      }

      // heatMap || heatMap.setOpacity(values[0]);
      // this.heatMaps.get(id).setOpacity(values[0]);
    });
  }

  /**
   * 使用slick-carousel jquery插件
   * @private
   */
  _createSliderCarousel() {
    $(this.contrainer.nativeElement).slick({ draggable : true});
    $(this.contrainer.nativeElement).on('afterChange', (event, slick, currentSlide, nextSlide) => {
      this._current_slide = $(this.contrainer.nativeElement).slick('slickCurrentSlide');
      const _current_heatMap = Array.from(this.heatMaps.values())[this._current_slide];
      this._updateHeatMapExtremaValues(_current_heatMap.getExtremaValues());

    });
  }

  /**
   * 更新热力图显示极值
   * @private
   */
  _updateHeatMapExtremaValues(extremaValues)　{
    document.getElementById(this.valueThresholdSliderId())['noUiSlider'].updateOptions({
      start: [extremaValues['min'], extremaValues['max']],
      range: {
        'min': extremaValues['min']　> 0 ? extremaValues['min'] : 1,
        'max': extremaValues['max']
      },
    });

  }



  /**
   * 聚合后端返回的数据，将deviceUID相同的数据放到一个数组里面
   * @param data
   * @returns {Array<any>}
   */
  _aggregation(data: Array<any>): Array<any> {
    const resultObject = data.reduce((previousValue, currentValue) => {
      previousValue[currentValue['deviceUID']] = (previousValue[currentValue['deviceUID']] || []).concat(currentValue['positions']);
      return previousValue;
    }, {});

    const resultArray = Object.keys(resultObject).reduce((previousValue, currentValue) => {
      previousValue.push({'deviceUID': currentValue, 'positions': resultObject[currentValue]});
      return previousValue;
    }, []);
    return resultArray;
  }

  heatMapBg(device) {
    if (device['heatmap_background']) {
      return environment.pre_img_url + device['heatmap_background'];
    } else {
      return '../../../assets/img/mine_banner.png';
    }

  }

  _updateGradientValues(extremaValues): void {
    this.gradientValues = [];
    const gradientArray = [0.25,0.55,0.85,1]
    for(const gradient of gradientArray){
      const gradientValue = extremaValues['min'] + (extremaValues['max'] - extremaValues['min']) * gradient;
      this.gradientValues.push(Math.ceil(gradientValue));
    }
  }

}
