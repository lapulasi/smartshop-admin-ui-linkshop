declare const h337: any;
import * as $ from 'jquery';
export class HeatMap {

  private _config = {
    width:640,
    height:480,
    container: null,
    radius: 20, // 半径
    maxOpacity: 0.6, // 透明度
    minOpacity: 0.2,
    minRenderThreshold: 0,
    maxRenderThreshold: 500,
    gradient: { 0.25: 'rgb(0,0,255)', 0.55: 'rgb(0,255,0)', 0.85: 'yellow', 1.0: 'rgb(255,0,0)'},
    blur: .75

  };

  private _onExtremaChange:(data:any)=>void

  originalWidth = 1280; //  1280 640
  originalHeight = 720; //  720  480

  private _heatMap;

  private coordinates: Array<any>;

  constructor( type: string, div: HTMLElement, data: Array<any>) {

    $(div).remove('canvas');
    this._config.container = div;

    if (type === 'month') {
      this._config.radius = 15;
    }

    this._heatMap = h337.create(this._config);

    this.coordinates = data.map((pos: any) => this.transformCoordinate(pos)
    );
    this._heatMap.setData({
      // max: 1,
      // min: 100,
      data: this.coordinates
    });

  }

  transformCoordinate(position: any): any {
    const currWidth = this._config.container.offsetWidth;
    const currHeight = this._config.container.offsetHeight;
    const posX = (position.x1 + position.x2) / 2;
    const posY = Math.max(position.y1, position.y2);
    return { x: (Math.floor(posX * currWidth / this.originalWidth / 16)  ) * 16 + 2,
      y: (Math.floor(posY * currHeight / this.originalHeight / 16) ) * 16 + 2,
      value: 1};

  }

  maxVal(): number {
    const count = this.coordinates.length;
    let maxVal = 3;
    switch (true)  {
      case count > 5000 : maxVal = 300; break;
      case count > 3000 : maxVal = 200; break;
      case count > 1500 : maxVal = 100; break;
      case count > 1000 : maxVal = 60; break;
      case count > 400 : maxVal = 25; break;
      case count > 200 : maxVal = 15; break;
      case count > 100 : maxVal = 8; break;
      case count >= 50 : maxVal = 4; break;
    }
    return maxVal;

  }

  setRenderThreshold(minRenderThreshold: number, maxRenderThreshold: number): void {
    this._heatMap.setRenderThreshold(minRenderThreshold , maxRenderThreshold);
  }

  setOpacity(opacity): void {
    this._config.maxOpacity = opacity;
    this._heatMap.configure(this._config);
  }

  getExtremaValues(): any {
    return this._heatMap.getExtremaValues();
  }

  destory(): void {
    $(this._config.container).children('canvas').remove();
    console.log('heatMap destroyed');
  }

  onExtremaChange(fn:(data:any)=>void): void {
    console.log(typeof fn);
    this._onExtremaChange = fn;
  }



}
