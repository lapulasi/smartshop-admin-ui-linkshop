import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatMapWrapperComponent } from './heat-map-wrapper.component';

describe('HeatMapWrapperComponent', () => {
  let component: HeatMapWrapperComponent;
  let fixture: ComponentFixture<HeatMapWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatMapWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatMapWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
