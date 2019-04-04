import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonKoperasiComponent } from './non-koperasi.component';

describe('NonKoperasiComponent', () => {
  let component: NonKoperasiComponent;
  let fixture: ComponentFixture<NonKoperasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonKoperasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonKoperasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
