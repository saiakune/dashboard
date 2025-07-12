import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfomanceMetricsComponent } from './perfomance-metrics.component';

describe('PerfomanceMetricsComponent', () => {
  let component: PerfomanceMetricsComponent;
  let fixture: ComponentFixture<PerfomanceMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfomanceMetricsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfomanceMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
