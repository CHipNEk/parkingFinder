import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingLotService, ParkingLot } from '../../../services/parking-lot.service'; // Import ParkingLot
import { NotificationService } from '../../../services/notifications-layout.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-favorites-layout',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzTableModule],
  templateUrl: './favorites-layout.component.html',
  styleUrl: './favorites-layout.component.scss',
})
export class FavoritesLayoutComponent implements OnInit {
  favoritesList: ParkingLot[] = []; // Sử dụng kiểu ParkingLot
  parkingHistory: any[] = [];
  filteredHistory: any[] = []; // Dữ liệu sau khi filter

  constructor(
    private parkingLotService: ParkingLotService,
    private notificationService: NotificationService
  ) {
    const cachedHistory = localStorage.getItem('parkingHistory');
    if (cachedHistory) {
      this.parkingHistory = JSON.parse(cachedHistory);
      this.filteredHistory = [...this.parkingHistory]; // Khởi tạo dữ liệu lọc
    }
  
    // Tải danh sách yêu thích từ localStorage
    const cachedFavorites = localStorage.getItem('favoritesList');
    if (cachedFavorites) {
      this.favoritesList = JSON.parse(cachedFavorites);
    }
  }

  ngOnInit(): void {
    // Tải danh sách yêu thích từ localStorage
    this.loadFavoritesFromCache();
  }

  private loadFavoritesFromCache(): void {
    const cachedFavorites = localStorage.getItem('favoritesList');
    if (cachedFavorites) {
      const favoriteNamesOrObjects = JSON.parse(cachedFavorites); // Có thể chứa cả tên hoặc đối tượng đầy đủ
      this.favoritesList = favoriteNamesOrObjects
        .map((item: any): ParkingLot | undefined => {
          if (item.name && !item.id) {
            // Nếu chỉ có tên, tìm thông tin đầy đủ từ ParkingLotService
            const lot = this.parkingLotService.findParkingLotByName(item.name);
            console.log(`Đồng bộ thông tin cho "${item.name}":`, lot);
            return lot;
          }
          return item as ParkingLot; // Nếu đã đầy đủ thông tin, giữ nguyên
        })
        .filter((lot: any): lot is ParkingLot => !!lot); // Loại bỏ các mục không tìm thấy
      console.log('Danh sách yêu thích sau khi đồng bộ:', this.favoritesList);
    } else {
      console.log('Không có dữ liệu trong localStorage');
    }
  }
  

  // Đặt chỗ nhanh
  bookParking(favorite: ParkingLot): void {
    this.notificationService.addNotification(
      `Đặt chỗ thành công tại ${favorite.name}.`,
      'success'
    );
    alert(`Đặt chỗ tại ${favorite.name}`);
  }

  // Xóa khỏi danh sách yêu thích
  removeFromFavorites(id: number): void {
    this.favoritesList = this.favoritesList.filter((favorite) => favorite.id !== id);
    this.saveToCache();
    alert('Đã xóa khỏi danh sách yêu thích!');
  }

  private saveToCache(): void {
    const favoriteNames = this.favoritesList.map((favorite) => ({ name: favorite.name }));
    console.log('Lưu danh sách yêu thích vào localStorage:', favoriteNames);
    localStorage.setItem('favoritesList', JSON.stringify(favoriteNames));
  }
}