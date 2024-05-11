import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeRevenueComponent } from './income-revenue.component';

describe('IncomeRevenueComponent', () => {
  let component: IncomeRevenueComponent;
  let fixture: ComponentFixture<IncomeRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncomeRevenueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncomeRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
