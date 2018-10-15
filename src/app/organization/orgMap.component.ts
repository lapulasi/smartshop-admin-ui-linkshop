import {Component, EventEmitter, OnInit, Output} from '@angular/core';
declare var BMap: any;
declare var BMapLib: any;

@Component({
  selector: 'app-map',
  template: `<div [hidden]="customShow" id='container' style='font-size: 12px; margin: 5px 0;'></div>
  <button (click)='initMouseDrawing()'>自定义边界</button>
  <input type="text" [(ngModel)]="districtName" placeholder="请输入行政名称" #input (keyup)="monitor(input.value)" [hidden]="!customShow"/>
  <div style='width:1000px;height:500px;border:1px solid gray' id='map_container'></div>`
})
export class OrgMapComponent implements OnInit {

  customShow = false;
  map: any;
  city: any;
  district: any;
  polyline: any;
  marker: any;

  geo: any;
  boundaryPoints: any;
  zoom: any;
  districtName: any;

  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.initMap();
  }

  initMap() {

    this.map = new BMap.Map('map_container');
    this.map.centerAndZoom(new BMap.Point(121.478125, 31.229649), 10);
    this.map.enableScrollWheelZoom(true);

    this.initCityList();
  }

  monitor(value) {
    this.emitEvent();
  }

  initCityList() {
    const that = this;

    const cityList = new BMapLib.CityList({container: 'container', 'map': this.map});

    // 下拉框选择
    cityList.addEventListener('cityclick', function(data){
      console.log(data);

      const areaType = data.area_type;
      const areaName = data.area_name;
      that.zoom = data.level;
      that.districtName = areaName;
      if (areaType === 2) {
        that.city = areaName;
      }
      if (areaType === 3) {
        that.district = areaName;
      }

      that.geo = data.geo.lng + ',' + data.geo.lat;

      // 获取行政区边界
      if (areaType === 1 || areaType === 2 || areaType === 3) {
        const bdary = new BMap.Boundary();

        bdary.get(areaName, function(rs){
          if (rs.boundaries.length > 0) {

            that.boundaryPoints = rs.boundaries.join('|');
          }
          // that.map.addOverlay(new BMap.Polygon(that.boundaryPoints, {strokeWeight: 2, strokeColor: '#ff0000'}));
          that.emitEvent();
        });

      }

      // 商圈
      if (areaType === 10) {
        cityList.getBusiness(areaName, function(rs){
          for (const obj of rs) {
            if (obj.city === that.city && obj.district === that.district) {
              that.getGeoStrFromArray(obj.geo);
            }
          }
          that.emitEvent();
        });
      }

    });
  }

  initMouseDrawing() {
    const that = this;
    this.customShow = true;
    this.map.clearOverlays();

    const styleOptions = {
      strokeColor: 'red',    // 边线颜色。
      fillColor: 'red',      // 填充颜色。当参数为空时，圆形将没有填充效果。
      strokeWeight: 3,       // 边线的宽度，以像素为单位。
      strokeOpacity: 0.8,	   // 边线透明度，取值范围0 - 1。
      fillOpacity: 0.6,      // 填充的透明度，取值范围0 - 1。
      strokeStyle: 'solid' // 边线的样式，solid或dashed。
    }

    const drawingManager = new BMapLib.DrawingManager(this.map, {
      isOpen: false, // 是否开启绘制模式
      enableDrawingTool: true, // 是否显示工具栏
      drawingToolOptions: {
        anchor: 0, // 位置
        offset: new BMap.Size(5, 5), // 偏离值
        drawingModes : ['polyline', 'marker']
      },
      polylineOptions: styleOptions, // 线的样式
    });

    drawingManager.addEventListener('overlaycomplete', function(e){
      that.zoom = that.map.getZoom();
      if ( e.drawingMode === 'polyline') {

        that.map.removeOverlay(that.polyline);
        that.polyline = e.overlay;
        that.getGeoStrFromArray(e.overlay.ia);
      }else if ( e.drawingMode === 'marker') {

        that.map.removeOverlay(that.marker);
        that.marker = e.overlay;
        const point = e.overlay.point;
        that.geo = point.lng + ',' + point.lat;
      }
      that.emitEvent();
    });

  }

  getGeoStrFromArray(arry) {
    let geoStr = '';
    for (const geo of arry) {
      geoStr = geoStr + geo['lng'] + ',' + geo['lat'] + ';';
    }
    this.boundaryPoints = geoStr.substring(0, geoStr.length - 1);
  }

  emitEvent() {
    this.change.emit({geo: this.geo, boundaryPoints: this.boundaryPoints, zoom: this.zoom, districtName: this.districtName});
  }

}
