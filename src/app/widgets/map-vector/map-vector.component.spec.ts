import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapVectorComponent } from './map-vector.component';

describe('MapVectorComponent', () => {
  let component: MapVectorComponent;
  let fixture: ComponentFixture<MapVectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapVectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapVectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
