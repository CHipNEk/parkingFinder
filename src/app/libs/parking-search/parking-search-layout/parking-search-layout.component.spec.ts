import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSearchLayoutComponent } from './parking-search-layout.component';

describe('ParkingSearchLayoutComponent', () => {
  let component: ParkingSearchLayoutComponent;
  let fixture: ComponentFixture<ParkingSearchLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkingSearchLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParkingSearchLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
