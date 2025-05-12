import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesLayoutComponent } from './favorites-layout.component';

describe('FavoritesLayoutComponent', () => {
  let component: FavoritesLayoutComponent;
  let fixture: ComponentFixture<FavoritesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoritesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
