import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CneSelectBoxComponent } from './cne-select-box.component';

describe('CneSelectBoxComponent', () => {
  let component: CneSelectBoxComponent;
  let fixture: ComponentFixture<CneSelectBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CneSelectBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CneSelectBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
