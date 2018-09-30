import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendaftaranAnggotaComponent } from './pendaftaran-anggota.component';

describe('PendaftaranAnggotaComponent', () => {
  let component: PendaftaranAnggotaComponent;
  let fixture: ComponentFixture<PendaftaranAnggotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendaftaranAnggotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendaftaranAnggotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
