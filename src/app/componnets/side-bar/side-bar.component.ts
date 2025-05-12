import { Component, OnInit } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [NzMenuModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {
  isCollapsed = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onMenuClick(route: string): void {
    this.router.navigate([route]);
  }

  logOut(): void {
    this.router.navigate(['/login']); // Chuyển hướng đến Dashboard
  }
}
