import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-layout',
  templateUrl: './settings-layout.component.html',
  styleUrls: ['./settings-layout.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzTabsModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzTableModule,
    NzInputNumberModule,
    NzSwitchModule,
    NzTagModule,
  ],
  standalone: true,
})
export class SettingsLayoutComponent implements OnInit {
  personalInfoForm!: FormGroup;
  passwordForm!: FormGroup;
  notificationSettingsForm!: FormGroup;
  displaySettingsForm!: FormGroup;

  twoFactorAuthEnabled: boolean = false; // Biến để bật/tắt xác thực 2 bước
  devices: any[] = []; // Danh sách thiết bị
  accountChanges: any[] = []; // Lịch sử thay đổi tài khoản

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Form thông tin cá nhân
    this.personalInfoForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    // Form đổi mật khẩu
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });

    // Form thông báo
    this.notificationSettingsForm = this.fb.group({
      bookingSuccess: [true],
      parkingFull: [true],
      promotions: [true],
    });

    // Form tùy chỉnh hiển thị
    this.displaySettingsForm = this.fb.group({
      theme: ['default', Validators.required],
      fontSize: [14, Validators.required],
    });

    // Giả lập dữ liệu thiết bị
    this.devices = [
      { id: 1, deviceName: 'iPhone 12', ip: '192.168.1.1', browser: 'Safari' },
      { id: 2, deviceName: 'Laptop', ip: '192.168.1.2', browser: 'Chrome' },
    ];

    // Giả lập lịch sử thay đổi tài khoản
    this.accountChanges = [
      { time: '2023-05-01 10:00', action: 'Thay đổi email', details: 'Từ abc@gmail.com sang xyz@gmail.com' },
      { time: '2023-05-02 14:00', action: 'Đổi mật khẩu', details: 'Thành công' },
    ];
  }

  // Lưu thông tin cá nhân
  savePersonalInfo(): void {
    if (this.personalInfoForm.valid) {
      const { name, email } = this.personalInfoForm.value;
      localStorage.setItem('userName', JSON.stringify(name));
      console.log('Thông tin cá nhân:', { name, email });
      alert('Thông tin cá nhân đã được lưu!');
    }
  }

  // Đổi mật khẩu
  changePassword(): void {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;
      if (newPassword !== confirmPassword) {
        alert('Mật khẩu mới và xác nhận mật khẩu không khớp!');
        return;
      }
      console.log('Đổi mật khẩu thành công:', { currentPassword, newPassword });
      alert('Mật khẩu đã được thay đổi!');
      this.passwordForm.reset();
    }
  }

  // Lưu cài đặt thông báo
  saveNotificationSettings(): void {
    if (this.notificationSettingsForm.valid) {
      const settings = this.notificationSettingsForm.value;
      console.log('Cài đặt thông báo:', settings);
      alert('Cài đặt thông báo đã được lưu!');
    }
  }

  // Lưu cài đặt hiển thị
  saveDisplaySettings(): void {
    if (this.displaySettingsForm.valid) {
      const settings = this.displaySettingsForm.value;
      console.log('Cài đặt hiển thị:', settings);
      alert('Cài đặt hiển thị đã được lưu!');
    }
  }

  // Hàm bật/tắt xác thực 2 bước
  toggleTwoFactorAuth(): void {
    this.twoFactorAuthEnabled = !this.twoFactorAuthEnabled;
    alert(`Xác thực 2 bước đã được ${this.twoFactorAuthEnabled ? 'bật' : 'tắt'}`);
  }

  // Đăng xuất khỏi thiết bị
  logoutDevice(deviceId: number): void {
    this.devices = this.devices.filter((device) => device.id !== deviceId);
    alert('Đã đăng xuất khỏi thiết bị!');
  }
}