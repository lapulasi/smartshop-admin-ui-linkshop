import { Component, OnInit } from '@angular/core';
import {ShopService} from './shop.service';
import {Shop} from './shop';


@Component({
  templateUrl: './shop.component.html',
  providers: [ShopService]
})
export class ShopComponent implements OnInit{

    shops : Shop[];
    errorMessage: string;

    constructor(private shopService : ShopService){
    }


    ngOnInit() :void { this.getShops(); }

    getShops() :void{
      this.shopService.getShops()
                       .subscribe(
                         shops => this.shops = shops,
                         error =>  this.errorMessage = <any>error);
    }


}
