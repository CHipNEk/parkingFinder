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
  userName: string | null = null; // Tên người dùng
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // Lấy tên từ localStorage
    this.userName = localStorage.getItem('userName');

    // Lắng nghe sự thay đổi của localStorage (nếu có)
    window.addEventListener('storage', this.updateUserName.bind(this));

    // Lắng nghe sự thay đổi của route để cập nhật tiêu đề
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateTitle();
    });

    // Gọi lần đầu khi component khởi tạo
    this.updateTitle();
  }

  private updateUserName(): void {
    this.userName = localStorage.getItem('userName');
  }

  ngOnDestroy(): void {
    // Xóa sự kiện lắng nghe khi component bị hủy
    window.removeEventListener('storage', this.updateUserName.bind(this));
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
