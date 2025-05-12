import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { NotificationService } from '../../../services/notifications-layout.service';

@Component({
  selector: 'app-notifications-layout',
  standalone: true,
  imports: [NzListModule, CommonModule],
  templateUrl: './notifications-layout.component.html',
  styleUrls: ['./notifications-layout.component.scss']
})
export class NotificationsLayoutComponent implements OnInit {
  notifications = [
    { id: 1, message: 'Đặt chỗ thành công tại Bãi đỗ xe A.', type: 'success', read: false },
    { id: 2, message: 'Bãi đỗ xe B đã gần đầy.', type: 'warning', read: false },
    { id: 3, message: 'Ưu đãi giảm giá 20% cho khách hàng mới.', type: 'info', read: false }
  ];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notifications = this.notificationService.getNotifications();
  }

  markAsRead(notificationId: number): void {
    this.notificationService.markAsRead(notificationId);
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead();
  }
}