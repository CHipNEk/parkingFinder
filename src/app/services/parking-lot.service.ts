import { Injectable } from '@angular/core';

export type ParkingLot = {
  id: number;
  name: string;
  distance: number;
  price: number;
  lat: number;
  lng: number;
};

@Injectable({
  providedIn: 'root',
})

export class ParkingLotService {
  private parkingLots = [
    { id: 1, name: 'Bãi đỗ xe A', distance: 1.2, price: 20000, lat: 21.028511, lng: 105.804817 },
    { id: 2, name: 'Bãi đỗ xe B', distance: 3.5, price: 15000, lat: 21.030653, lng: 105.835242 },
    { id: 3, name: 'Bãi đỗ xe C', distance: 0.8, price: 25000, lat: 21.027763, lng: 105.821938 },
    { id: 4, name: 'Bãi đỗ xe D', distance: 2.0, price: 18000, lat: 21.0245, lng: 105.84117 },
    { id: 5, name: 'Bãi đỗ xe E', distance: 4.0, price: 22000, lat: 21.0333, lng: 105.8000 },
    { id: 6, name: 'Bãi đỗ xe F', distance: 2.5, price: 19000, lat: 21.0350, lng: 105.8100 },
    { id: 7, name: 'Bãi đỗ xe G', distance: 3.0, price: 17000, lat: 21.0290, lng: 105.8200 },
    { id: 8, name: 'Bãi đỗ xe H', distance: 1.8, price: 21000, lat: 21.0310, lng: 105.8300 },
    { id: 9, name: 'Bãi đỗ xe I', distance: 2.2, price: 16000, lat: 21.0260, lng: 105.8150 },
    { id: 10, name: 'Bãi đỗ xe J', distance: 3.8, price: 23000, lat: 21.0320, lng: 105.8050 },
    { id: 11, name: 'Bãi đỗ xe K', distance: 10, price: 23000, lat: 21.0320, lng: 105.8050 },
  ];

  getParkingLots() {
    return this.parkingLots;
  }

  // Tìm bãi đỗ theo tên
  findParkingLotByName(name: string): ParkingLot | undefined {
    const lot = this.parkingLots.find((lot) => lot.name === name);
    console.log(`Tìm bãi đỗ với tên "${name}":`, lot);
    return lot;
  }
}