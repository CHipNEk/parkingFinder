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
  parkingHistory = [
    {
      time: '2023-05-01 08:00 - 2023-05-01 10:00',
      parkingLot: 'Bãi đỗ xe A',
      totalFee: 20000,
      status: 'Hoàn tất'
    },
    {
      time: '2023-05-02 14:00 - 2023-05-02 16:00',
      parkingLot: 'Bãi đỗ xe B',
      totalFee: 30000,
      status: 'Đã hủy'
    },
    {
      time: '2023-05-03 09:00 - 2023-05-03 11:00',
      parkingLot: 'Bãi đỗ xe C',
      totalFee: 25000,
      status: 'Hoàn tất'
    }
  ];

  filteredHistory = [...this.parkingHistory]; // Dữ liệu sau khi filter
  favoritesList: any[] = [];

  constructor() {
    const cachedFavorites = localStorage.getItem('favoritesList');
    if (cachedFavorites) {
      this.favoritesList = JSON.parse(cachedFavorites);
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
    this.saveToCache();
  }

  private saveToCache(): void {
    localStorage.setItem('favoritesList', JSON.stringify(this.favoritesList));
  }

  filterByDate(startDate: string, endDate: string): void {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    this.filteredHistory = this.parkingHistory.filter((entry) => {
      const [startTime, endTime] = entry.time.split(' - ').map((time) => new Date(time).getTime());
      return startTime >= start && endTime <= end;
    });
  }
}