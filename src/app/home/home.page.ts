import { Component, OnInit, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonText,
} from '@ionic/angular';
import { CoinService } from '../services/coin.service';
import { Coin } from '../models/coin.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonText,
  ],
})
export class HomePage implements OnInit {
  // Pakai signal supaya tampilan pasti ke-update, baik app jalan dengan zone.js maupun zoneless
  coins = signal<Coin[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(private coinService: CoinService) {}

  ngOnInit() {
    this.loadCoins();
  }

  // dipanggil pas halaman dibuka, tombol "Refresh" ditekan, atau pull-to-refresh
  loadCoins(event?: any) {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.coinService.getCoins().subscribe({
      next: (data) => {
        this.coins.set(data);
        this.isLoading.set(false);
        event?.target?.complete();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('Gagal mengambil data. Cek koneksi internet kamu.');
        this.isLoading.set(false);
        event?.target?.complete();
      },
    });
  }

  // dipanggil pas user narik layar ke bawah (pull-to-refresh)
  doRefresh(event: any) {
    this.loadCoins(event);
  }
}
