import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JangkaPanjangComponent } from './jangka-panjang.component';

describe('JangkaPanjangComponent', () => {
  let component: JangkaPanjangComponent;
  let fixture: ComponentFixture<JangkaPanjangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JangkaPanjangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JangkaPanjangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
