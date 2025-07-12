import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusComplianceComponent } from './status-compliance.component';

describe('StatusComplianceComponent', () => {
  let component: StatusComplianceComponent;
  let fixture: ComponentFixture<StatusComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusComplianceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
