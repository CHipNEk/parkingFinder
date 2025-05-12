import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingHistoryLayoutComponent } from './parking-history-layout.component';

describe('ParkingHistoryLayoutComponent', () => {
  let component: ParkingHistoryLayoutComponent;
  let fixture: ComponentFixture<ParkingHistoryLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkingHistoryLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParkingHistoryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
