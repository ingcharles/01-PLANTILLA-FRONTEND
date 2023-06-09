import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CneAlertsComponent } from './cne-alerts.component';

describe('CneAlertsComponent', () => {
  let component: CneAlertsComponent;
  let fixture: ComponentFixture<CneAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CneAlertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CneAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
