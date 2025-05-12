import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [NzCardModule, NzStatisticModule, NzTagModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
  cities: string[] = [
    'Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 
    'Cần Thơ', 'Nha Trang', 'Huế', 'Vũng Tàu', 'Đà Lạt', 'Quy Nhơn'
  ];
}
