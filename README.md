# Tugas 03 MSIM4401 — Crypto Ticker (Ionic Angular, Standalone)

Aplikasi mobile yang menampilkan data cryptocurrency (rank, name, symbol,
price_usd) dari API publik Coinlore: `https://api.coinlore.net/api/tickers/`.

## Cara setup (dari nol)

1. Install Node.js (LTS) dan Ionic CLI kalau belum ada:
   ```
   npm install -g @ionic/cli
   ```
2. Buat project baru dengan template "blank". Pas ditanya, pilih **Angular** lalu **Standalone**:
   ```
   ionic start crypto-app blank
   cd crypto-app
   ```
3. Salin 5 file di bawah ini ke folder project sesuai path-nya (timpa kalau sudah ada):
   - `src/app/models/coin.model.ts`
   - `src/app/services/coin.service.ts`
   - `src/app/home/home.page.ts`
   - `src/app/home/home.page.html`
   - `src/app/home/home.page.scss`
4. Buka `src/main.ts`, tambahkan `provideHttpClient()` di array `providers`
   (lihat bagian "Perubahan di main.ts" di bawah).
5. Jalankan:
   ```
   ionic serve
   ```
   atau untuk device/emulator Android:
   ```
   ionic build
   npx cap add android
   npx cap copy android
   npx cap open android
   ```

## Daftar file yang dibuat/diubah, dan penjelasannya

| File | Fungsi |
|---|---|
| `src/app/models/coin.model.ts` | Interface TypeScript yang mendefinisikan bentuk satu koin (`Coin`) dan bentuk response API (`CoinResponse`). Response asli Coinlore itu object `{ data: [...], info: {...} }`, jadi field yang dipakai (rank, name, symbol, price_usd) ada di dalam array `data`. |
| `src/app/services/coin.service.ts` | Service Angular (`CoinService`) dengan satu fungsi, `getCoins()`. Pakai `HttpClient` buat GET ke endpoint Coinlore, lalu `map()` buat langsung ambil array `data`-nya, jadi komponen tinggal terima `Coin[]`. |
| `src/app/home/home.page.ts` | Logic halaman utama. Pas halaman kebuka (`ngOnInit`) langsung manggil `loadCoins()`. Hasilnya disimpan di `signal` (`coins`, `isLoading`, `errorMessage`). Karena ini komponen standalone, semua komponen Ionic yang dipakai di template (`IonHeader`, `IonContent`, `IonList`, dst.) diimport langsung di `imports` milik komponen. |
| `src/app/home/home.page.html` | Template halaman: tombol **Refresh**, `ion-refresher` buat pull-to-refresh, dan `ion-list` yang di-loop pakai `@for` buat nampilin rank, name+symbol, dan price_usd. Kalau gagal ambil data, ditampilkan pesan error lewat `@if`. |
| `src/app/home/home.page.scss` | Styling kecil: warna krem/kuning di tiap item list biar mirip mockup soal. |
| `src/main.ts` | Titik awal aplikasi. Yang ditambahin cuma `provideHttpClient()` di `providers`, karena tanpa ini `HttpClient` di `CoinService` gak akan jalan. |

> Di template **standalone** tidak ada `app.module.ts`, `home.module.ts`, maupun
> `home-routing.module.ts`. Routing sudah ditangani `src/app/app.routes.ts`
> bawaan template (lazy-load `HomePage` lewat `loadComponent`).

### Perubahan di main.ts

```ts
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(), // <-- tambahan
  ],
});
```

## Alur kerjanya singkatnya

1. `HomePage` dibuka → `ngOnInit()` manggil `loadCoins()`.
2. `loadCoins()` manggil `CoinService.getCoins()`.
3. `CoinService` GET ke API Coinlore, ambil field `data` dari response JSON.
4. Hasilnya (`Coin[]`) disimpan ke signal `coins`.
5. Template otomatis re-render karena membaca `coins()` di dalam `@for`.
6. Tombol **Refresh** atau pull-to-refresh tinggal manggil ulang `loadCoins()`.

## Catatan

- `price_usd` dari API Coinlore formatnya string (misal `"80376.35"`), jadi
  langsung ditampilkan apa adanya — sesuai soal (cuma nampilin rank, name,
  symbol, price_usd).
- Kalau internet mati / API down, halaman nampilin pesan error, bukan nge-crash.
- Kalau pakai template **NgModules** (bukan Standalone), `home.page.ts` perlu
  `standalone: false` di `@Component` dan tanpa array `imports`; sisanya
  (`home.module.ts`, `home-routing.module.ts`, `app.module.ts`) dipakai seperti biasa.
