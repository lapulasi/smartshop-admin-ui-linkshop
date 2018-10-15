import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy, HashLocationStrategy, PathLocationStrategy} from '@angular/common';

import {AppComponent} from './app.component';
import {BsDropdownModule} from 'ngx-bootstrap';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ModalModule} from 'ngx-bootstrap';

import {NAV_DROPDOWN_DIRECTIVES} from './shared/nav-dropdown.directive';

import {ChartsModule} from 'ng2-charts/ng2-charts';
import {SIDEBAR_TOGGLE_DIRECTIVES} from './shared/sidebar.directive';
import {AsideToggleDirective} from './shared/aside.directive';
import {BreadcrumbsComponent} from './shared/breadcrumb.component';
import {Pagination} from './shared/pagination.component';

// Routing Module
import {AppRoutingModule} from './app.routing';

// Layouts
import {FullLayoutComponent} from './layouts/full-layout.component';

import {HttpModule, JsonpModule, Http, XHRBackend} from '@angular/http';
import {ShopComponent} from './shop/shop.component';


// auth
import {CanActivateViaAuthGuard, CanActivateChildViaAuthGuard} from './common/CanActivateViaAuthGuard';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BackendHostInterceptor} from './backendhost.interceptor';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FileUploadModule} from 'ng2-file-upload';
import {CompanyTreeComponent} from "./shared/companyTree/companyTree.component";
// import {ShareModule} from "./shared/share.module";
// import { HeatMapComponent } from './device/heatMap/heat-map/heat-map.component';
// import {ErrorInterceptor} from "./service/http_interceptor";

@NgModule({
  imports: [
    HttpModule,
    JsonpModule,
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    CommonModule,
    FileUploadModule,
    ModalModule.forRoot(), // 将树状结构改为弹框
    // ShareModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    ShopComponent,
    Pagination,
    /*CompanyTreeComponent*/
    // HeatMapComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: PathLocationStrategy // HashLocationStrategy 有#号
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BackendHostInterceptor,
      multi: true,
    },
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },*/
    CanActivateViaAuthGuard,
    CanActivateChildViaAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
