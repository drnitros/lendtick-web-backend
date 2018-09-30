import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncProductComponent } from './sync-product.component';

describe('SyncProductComponent', () => {
  let component: SyncProductComponent;
  let fixture: ComponentFixture<SyncProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyncProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
