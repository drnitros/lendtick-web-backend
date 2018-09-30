import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutErrorComponent } from './layout-error.component';

describe('LayoutErrorComponent', () => {
  let component: LayoutErrorComponent;
  let fixture: ComponentFixture<LayoutErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
