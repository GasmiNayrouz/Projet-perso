import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewZoneTemperatureComponent } from './view-zone-temperature.component';

describe('ViewZoneTemperatureComponent', () => {
  let component: ViewZoneTemperatureComponent;
  let fixture: ComponentFixture<ViewZoneTemperatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewZoneTemperatureComponent]
    });
    fixture = TestBed.createComponent(ViewZoneTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
