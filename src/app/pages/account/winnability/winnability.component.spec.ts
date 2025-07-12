import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnabilityComponent } from './winnability.component';

describe('WinnabilityComponent', () => {
  let component: WinnabilityComponent;
  let fixture: ComponentFixture<WinnabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinnabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinnabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
