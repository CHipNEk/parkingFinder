import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsLayoutComponent } from './notifications-layout.component';

describe('NotificationsLayoutComponent', () => {
  let component: NotificationsLayoutComponent;
  let fixture: ComponentFixture<NotificationsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
