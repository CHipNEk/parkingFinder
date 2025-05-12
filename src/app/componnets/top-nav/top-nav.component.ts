import { Component, OnInit } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [NzAvatarModule],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss'
})
export class TopNavComponent implements OnInit {

  currentTitle: string = 'Trang chủ'; // Tiêu đề mặc định
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

 ngOnInit(): void {
    // Lắng nghe sự thay đổi của route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateTitle();
      });
  }

  updateTitle(): void {
    // Lấy thông tin route hiện tại
    let currentRoute = this.activatedRoute;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }
  
    const routePath = currentRoute.snapshot.url[0]?.path;
    // Cập nhật tiêu đề dựa trên route
    switch (routePath) {
      case 'dashboard':
        this.currentTitle = 'Trang chủ';
        break;
      case 'parking-search':
        this.currentTitle = 'Tìm bãi đỗ xe';
        break;
      case 'map':
        this.currentTitle = 'Bản đồ';
        break;
      case 'booking':
        this.currentTitle = 'Đặt chỗ';
        break;
      case 'wallet':
        this.currentTitle = 'Ví điện tử';
        break;
      case 'parking-history':
        this.currentTitle = 'Lịch sử đỗ xe';
        break;
      case 'favorites':
        this.currentTitle = 'Bãi đỗ yêu thích';
        break;
      case 'notifications':
        this.currentTitle = 'Thông báo';
        break;
      case 'settings':
        this.currentTitle = 'Cài đặt';
        break;
      default:
        this.currentTitle = 'Trang chủ'; // Tiêu đề mặc định
        break;
    }
  }

}
