import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSignComponent } from './layout-sign.component';

describe('LayoutSignComponent', () => {
  let component: LayoutSignComponent;
  let fixture: ComponentFixture<LayoutSignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutSignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
