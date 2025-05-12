import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: { id: number; message: string; type: string; read: boolean }[] = [];

  constructor() {
    // Tải thông báo từ localStorage khi service được khởi tạo
    const cachedNotifications = localStorage.getItem('notifications');
    if (cachedNotifications) {
      this.notifications = JSON.parse(cachedNotifications);
    }
  }

  // Lấy danh sách thông báo
  getNotifications() {
    return this.notifications;
  }

  // Thêm thông báo mới
  addNotification(message: string, type: string) {
    this.notifications.unshift({
      id: this.notifications.length + 1,
      message,
      type,
      read: false
    });
    this.saveToCache(); // Lưu vào cache
  }

  // Đánh dấu thông báo là đã đọc
  markAsRead(notificationId: number) {
    const notification = this.notifications.find((n) => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.saveToCache(); // Lưu vào cache
    }
  }

  // Đánh dấu tất cả thông báo là đã đọc
  markAllAsRead() {
    this.notifications.forEach((n) => (n.read = true));
    this.saveToCache(); // Lưu vào cache
  }

  // Lưu danh sách thông báo vào localStorage
  private saveToCache() {
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }
}