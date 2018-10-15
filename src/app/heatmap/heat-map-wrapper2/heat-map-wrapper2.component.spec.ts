import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatMapWrapper2Component } from './heat-map-wrapper2.component';

describe('HeatMapWrapper2Component', () => {
  let component: HeatMapWrapper2Component;
  let fixture: ComponentFixture<HeatMapWrapper2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatMapWrapper2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatMapWrapper2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
