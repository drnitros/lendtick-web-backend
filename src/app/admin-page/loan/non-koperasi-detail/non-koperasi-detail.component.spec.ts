import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonKoperasiDetailComponent } from './non-koperasi-detail.component';

describe('NonKoperasiDetailComponent', () => {
  let component: NonKoperasiDetailComponent;
  let fixture: ComponentFixture<NonKoperasiDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonKoperasiDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonKoperasiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
