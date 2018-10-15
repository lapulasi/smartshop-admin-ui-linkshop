import {Component, EventEmitter, OnInit, Output} from "@angular/core";
declare var BMap: any;
declare var BMapLib: any;

@Component({
  selector: 'app-channelmap',
  template: `<div id="container" style="font-size: 12px; margin: 5px 0;"></div>
  <div style="width:1000px;height:500px;border:1px solid gray" id="map_container"></div>`
})
export class ChannelMapComponent implements OnInit {

  center: any;
  map: any;
  zoom: any;


  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    let that = this;
    this.map = new BMap.Map('map_container');
    this.map.centerAndZoom(new BMap.Point(121.478125, 31.229649), 12);
    this.map.enableScrollWheelZoom(true);

    const cityList = new BMapLib.CityList({container: 'container', 'map': this.map});

    let geoc = new BMap.Geocoder();
    this.map.addEventListener('click', function (e) {
      that.center = e.point.lng + ',' + e.point.lat;
      that.zoom = that.map.getZoom();

      geoc.getLocation(e.point, function(rs){
        const addrCom = rs.addressComponents;
        that.change.emit({zoom: that.zoom, center: that.center, province: addrCom.province, city: addrCom.city, district: addrCom.district, address: rs.address});
      });

      // that.change.emit({center: that.center});
    });
  }


}
