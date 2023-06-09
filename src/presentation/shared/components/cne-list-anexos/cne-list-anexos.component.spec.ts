import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CneListAnexosComponent } from './cne-list-anexos.component';

describe('CneListAnexosComponent', () => {
  let component: CneListAnexosComponent;
  let fixture: ComponentFixture<CneListAnexosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CneListAnexosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CneListAnexosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
