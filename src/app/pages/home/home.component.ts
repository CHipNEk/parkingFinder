import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { SideBarComponent } from "../../componnets/side-bar/side-bar.component";
import { TopNavComponent } from "../../componnets/top-nav/top-nav.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SideBarComponent, NzLayoutModule, TopNavComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
