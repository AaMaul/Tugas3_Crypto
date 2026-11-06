// Bentuk data yang dibalikin sama API Coinlore (https://api.coinlore.net/api/tickers/)

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: string;
  percent_change_24h: string;
  price_btc: string;
  market_cap_usd: string;
  volume24: number;
  csupply: string;
  tsupply: string;
  msupply: string;
}

// Response API aslinya dibungkus di dalam key "data", bukan array langsung
export interface CoinResponse {
  data: Coin[];
  info: {
    coins_num: number;
    time: number;
  };
}
