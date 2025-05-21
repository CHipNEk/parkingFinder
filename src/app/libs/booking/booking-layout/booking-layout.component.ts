import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NotificationService } from '../../../services/notifications-layout.service';
import { ParkingLotService } from '../../../services/parking-lot.service';

@Component({
  selector: 'app-booking-layout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzButtonModule, NzInputModule, NzSelectModule, NzTableModule],
  templateUrl: './booking-layout.component.html',
  styleUrls: ['./booking-layout.component.scss']
})
export class BookingLayoutComponent implements OnInit {
  bookingForm!: FormGroup;
  estimatedFee: number | null = null;
  bookingList: any[] = []; // Danh sách đặt chỗ
  parkingLots: any[] = []; // Danh sách bãi đỗ xe

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private parkingLotService: ParkingLotService,
  ) {}

  ngOnInit(): void {

    // Lấy danh sách bãi đỗ từ ParkingLotService
    this.parkingLots = this.parkingLotService.getParkingLots();

    // Tải danh sách đặt chỗ từ localStorage
    const cachedBookings = localStorage.getItem('bookingList');
    if (cachedBookings) {
      this.bookingList = JSON.parse(cachedBookings);
    }

    // Khởi tạo form với ReactiveForms
    this.bookingForm = this.fb.group({
      parkingLot: ['', Validators.required], // Bãi đỗ xe
      arrivalDate: ['', Validators.required], // Ngày đến
      arrivalTime: ['', Validators.required], // Giờ đến
      departureDate: ['', Validators.required], // Ngày đi
      departureTime: ['', Validators.required], // Giờ đi
      licensePlate: ['', [Validators.required, Validators.pattern(/^[A-Z0-9-]+$/)]], // Biển số xe
    });
  }

  // Hàm tính phí tạm tính
  calculateFee(): void {
    if (this.bookingForm.valid) {
      const { arrivalDate, arrivalTime, departureDate, departureTime, parkingLot } = this.bookingForm.value;
  
      const selectedLot = this.parkingLots.find((lot) => lot.id === parkingLot);
      if (!selectedLot) {
        alert('Bãi đỗ không hợp lệ!');
        return;
      }
  
      const arrival = new Date(`${arrivalDate}T${arrivalTime}`);
      const departure = new Date(`${departureDate}T${departureTime}`);
  
      const diffInMs = departure.getTime() - arrival.getTime();
      if (diffInMs <= 0) {
        alert('Thời gian đi phải lớn hơn thời gian đến!');
        return;
      }
  
      const hours = Math.ceil(diffInMs / (1000 * 60 * 60)); // Chuyển đổi từ milliseconds sang giờ
      this.estimatedFee = hours * selectedLot.price; // Tính phí dựa trên giá của bãi đỗ
    } else {
      alert('Vui lòng điền đầy đủ thông tin!');
    }
  }

  // Hàm gửi đặt chỗ
  submitBooking(): void {
    if (this.bookingForm.valid) {
      const selectedLotId = this.bookingForm.value.parkingLot;
      const selectedLot = this.parkingLots.find((lot) => lot.id === selectedLotId);
  
      if (!selectedLot) {
        alert('Bãi đỗ không hợp lệ!');
        return;
      }
  
      const bookingData = {
        ...this.bookingForm.value,
        parkingLot: selectedLot.name, // Lưu tên bãi đỗ thay vì id
        fee: this.estimatedFee, // Thêm phí tạm tính vào dữ liệu
      };
  
      // Thêm dữ liệu vào danh sách đặt chỗ
      this.bookingList.unshift(bookingData);
  
      // Lưu danh sách đặt chỗ vào localStorage
      this.saveToCache();

      // Lưu vào lịch sử đặt chỗ
      this.saveToHistory(bookingData);
  
      // Thêm thông báo
      this.notificationService.addNotification(
        `Đặt chỗ thành công tại ${selectedLot.name}.`,
        'success'
      );
  
      // Reset form và phí tạm tính
      this.bookingForm.reset();
      this.estimatedFee = null;
  
      alert('Đặt chỗ thành công!');
    } else {
      alert('Vui lòng điền đầy đủ thông tin!');
    }
  }

  // Lưu thông tin đặt chỗ vào lịch sử
  private saveToHistory(bookingData: any): void {
    const cachedHistory = localStorage.getItem('parkingHistory');
    const parkingHistory = cachedHistory ? JSON.parse(cachedHistory) : [];

    // Thêm thông tin đặt chỗ vào lịch sử
    parkingHistory.unshift({
      time: `${bookingData.arrivalDate} ${bookingData.arrivalTime} - ${bookingData.departureDate} ${bookingData.departureTime}`,
      parkingLot: bookingData.parkingLot,
      totalFee: bookingData.fee,
      status: 'Hoàn tất',
    });

    // Lưu lịch sử vào localStorage
    localStorage.setItem('parkingHistory', JSON.stringify(parkingHistory));
  }

  // Lưu danh sách đặt chỗ vào localStorage
  private saveToCache(): void {
    localStorage.setItem('bookingList', JSON.stringify(this.bookingList));
  }
}