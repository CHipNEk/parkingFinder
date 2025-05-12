import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import * as L from 'leaflet';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NotificationService } from '../../../services/notifications-layout.service';
import { ParkingLotService } from '../../../services/parking-lot.service';


@Component({
  selector: 'app-parking-search-layout',
  standalone: true,
  imports: [FormsModule, NzInputModule, NzSelectModule, NzTableModule, CommonModule, NzButtonModule, NzModalModule, NzTagModule],
  templateUrl: './parking-search-layout.component.html',
  styleUrl: './parking-search-layout.component.scss'
})
export class ParkingSearchLayoutComponent implements OnInit, AfterViewInit {

   parkingLots: any[] = [];

   // Biến lưu trữ kết quả tìm kiếm
   filteredParkingLots: any[] = [];

   // Biến lưu trữ thông tin tìm kiếm
   searchQuery: string = '';
   selectedDistance: number | null = null;
   selectedPrice: string | null = null;

   favoritesList: any[] = [];
   selectedLot: any | null = null; // Lưu thông tin bãi đỗ được chọn
   isModalVisible: boolean = false; // Kiểm soát hiển thị modal

  constructor(
    private notificationService: NotificationService,
    private parkingLotService: ParkingLotService,
  ) {} // Inject NotificationService

  ngOnInit(): void {
    // Lấy danh sách bãi đỗ từ ParkingLotService
    this.parkingLots = this.parkingLotService.getParkingLots();
    this.filteredParkingLots = [...this.parkingLots];

    const cachedFavorites = localStorage.getItem('favoritesList');
    if (cachedFavorites) {
      this.favoritesList = JSON.parse(cachedFavorites);
    }
  }

  ngAfterViewInit(): void {
    const map = L.map('map').setView([21.028511, 105.804817], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    this.parkingLots.forEach((lot) => {
      const marker = L.marker([lot.lat, lot.lng]).addTo(map);
      marker.bindPopup(`<b>${lot.name}</b><br>Khoảng cách: ${lot.distance} km<br>Giá: ${lot.price} VND`);
    });

    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }

  searchParking(): void {
    this.filteredParkingLots = this.parkingLots.filter((lot) => {
      const matchesQuery = this.searchQuery
        ? lot.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;
  
      const matchesDistance = this.selectedDistance
        ? lot.distance <= this.selectedDistance
        : true;
  
      const matchesPrice =
        this.selectedPrice === 'low'
          ? true // Giá thấp đến cao không cần lọc
          : this.selectedPrice === 'high'
          ? true // Giá cao đến thấp không cần lọc
          : true;
  
        return matchesQuery && matchesDistance && matchesPrice;
      });
  
      // Debug: Kiểm tra kết quả lọc
      console.log('Filtered Parking Lots:', this.filteredParkingLots);
    }

  bookParking(lot: any): void {
    // Thêm thông báo khi đặt chỗ
    this.notificationService.addNotification(
      `Đặt chỗ thành công tại ${lot.name}.`,
      'success'
    );

    alert(`Đặt chỗ tại ${lot.name}`);
  }

  isFavorite(lot: any): boolean {
    return this.favoritesList.some((favorite) => favorite.id === lot.id);
  }

  toggleFavorite(lot: any): void {
    if (this.isFavorite(lot)) {
      this.favoritesList = this.favoritesList.filter((favorite) => favorite.id !== lot.id);
      this.notificationService.addNotification(
        `Đã xóa ${lot.name} khỏi danh sách yêu thích.`,
        'info'
      );
    } else {
      this.favoritesList.push(lot);
      this.notificationService.addNotification(
        `Đã thêm ${lot.name} vào danh sách yêu thích.`,
        'success'
      );
    }
    localStorage.setItem('favoritesList', JSON.stringify(this.favoritesList));
  }

  viewDetails(lot: any): void {
    this.selectedLot = lot; // Lưu thông tin bãi đỗ được chọn
    console.log('Selected Lot:', this.selectedLot); // Debug: Kiểm tra thông tin bãi đỗ được chọn
    this.syncFavorites(); // Đồng bộ danh sách yêu thích từ cache
    this.isModalVisible = true; // Hiển thị modal
  }

  // Đồng bộ danh sách yêu thích từ cache
  private syncFavorites(): void {
    const cachedFavorites = localStorage.getItem('favoritesList');
    if (cachedFavorites) {
      this.favoritesList = JSON.parse(cachedFavorites);
    }
  }

  closeModal(): void {
    this.isModalVisible = false; // Đóng modal
  }

}
