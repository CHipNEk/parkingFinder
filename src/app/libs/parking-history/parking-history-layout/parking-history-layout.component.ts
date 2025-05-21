import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-parking-history-layout',
  standalone: true,
  imports: [NzTableModule, CommonModule, FormsModule, NzButtonModule],
  templateUrl: './parking-history-layout.component.html',
  styleUrls: ['./parking-history-layout.component.scss']
})
export class ParkingHistoryLayoutComponent {
  parkingHistory: any[] = [];

  filteredHistory = [...this.parkingHistory]; // Dữ liệu sau khi filter
  favoritesList: any[] = [];

  constructor() {
    const cachedHistory = localStorage.getItem('parkingHistory');
    if (cachedHistory) {
      this.parkingHistory = JSON.parse(cachedHistory);
      this.filteredHistory = [...this.parkingHistory];
    }
  
    // Tải danh sách yêu thích từ localStorage
    const cachedFavorites = localStorage.getItem('favoritesList');
    if (cachedFavorites) {
      this.favoritesList = JSON.parse(cachedFavorites);
    }
  }
  
  // Làm mới dữ liệu lịch sử khi cần
  refreshHistory(): void {
    const cachedHistory = localStorage.getItem('parkingHistory');
    if (cachedHistory) {
      this.parkingHistory = JSON.parse(cachedHistory);
      this.filteredHistory = [...this.parkingHistory];
    }
  }

  isFavorite(parkingLot: string): boolean {
    return this.favoritesList.some((favorite) => favorite.name === parkingLot);
  }

  toggleFavorite(parkingLot: any): void {
    if (this.isFavorite(parkingLot)) {
      this.favoritesList = this.favoritesList.filter((favorite) => favorite.name !== parkingLot);
      alert('Đã xóa khỏi danh sách yêu thích!');
    } else {
      this.favoritesList.push({ name: parkingLot });
      alert('Đã thêm vào danh sách yêu thích!');
    }
  
    // Lưu danh sách yêu thích vào localStorage
    this.saveToCache();
  }

  private saveToCache(): void {
    localStorage.setItem('favoritesList', JSON.stringify(this.favoritesList));
  }

  filterByDate(startDate: string, endDate: string): void {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
  
    this.filteredHistory = this.parkingHistory.filter((entry) => {
      const [startTime, endTime]: [string, string] = entry.time.split(' - '); // Định nghĩa kiểu cho startTime và endTime
      const startTimestamp = new Date(startTime).getTime();
      const endTimestamp = new Date(endTime).getTime();
      return startTimestamp >= start && endTimestamp <= end;
    });
  }
}