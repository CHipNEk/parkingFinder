import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component';
import { WelcomeComponent } from './pages/welcome/welcome.component'; 
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LayoutComponent } from './componnets/layout/layout.component';
import { DashboardLayoutComponent } from './libs/dashboard/dashboard-layout/dashboard-layout.component';
import { ParkingSearchLayoutComponent } from './libs/parking-search/parking-search-layout/parking-search-layout.component';
import { MapLayoutComponent } from './libs/map/map-layout/map-layout.component';
import { BookingLayoutComponent } from './libs/booking/booking-layout/booking-layout.component';
import { WalletLayoutComponent } from './libs/wallet/wallet-layout/wallet-layout.component';
import { ParkingHistoryLayoutComponent } from './libs/parking-history/parking-history-layout/parking-history-layout.component';
import { FavoritesLayoutComponent } from './libs/favorites/favorites-layout/favorites-layout.component';
import { NotificationsLayoutComponent } from './libs/notifications/notifications-layout/notifications-layout.component';
import { SettingsLayoutComponent } from './libs/settings/settings-layout/settings-layout.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {
      path: '',
      redirectTo: 'login', // Chuyển hướng đến trang Login khi truy cập root
      pathMatch: 'full',
    },
    {
        path: '',
        component: HomeComponent,
        children: [
          {
              path: '',
              component: WelcomeComponent,
          },
          {
            path: '',
            component: LayoutComponent,
            children: [
                { path: 'dashboard', component: DashboardLayoutComponent },
                { path: 'parking-search', component: ParkingSearchLayoutComponent },
                { path: 'map', component: MapLayoutComponent },
                { path: 'booking', component: BookingLayoutComponent },
                { path: 'wallet', component: WalletLayoutComponent },
                { path: 'parking-history', component: ParkingHistoryLayoutComponent },
                { path: 'favorites', component: FavoritesLayoutComponent },
                { path: 'notifications', component: NotificationsLayoutComponent },
                { path: 'settings', component: SettingsLayoutComponent },
            ],
          },
        ],
    },
    { path: '**', redirectTo: '' }, 
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
