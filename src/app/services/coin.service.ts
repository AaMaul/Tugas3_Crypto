import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coin, CoinResponse } from '../models/coin.model';

@Injectable({
  providedIn: 'root',
})
export class CoinService {

  private readonly API_URL = 'https://api.coinlore.net/api/tickers/';

  constructor(private http: HttpClient) {}

  // Ambil data, lalu ambil cuma array "data"-nya aja buat dipakai di halaman
  getCoins(): Observable<Coin[]> {
    return this.http
      .get<CoinResponse>(this.API_URL)
      .pipe(map((response) => response.data));
  }
}
