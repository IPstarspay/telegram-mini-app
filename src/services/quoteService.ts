import axios from 'axios';

export interface QuoteData {
  price: string;
  percent_change_24h: string;
  market_cap: string;
  high_24h: string;
  low_24h: string;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
}

export const getQuote = async (symbol: string): Promise<QuoteData> => {
  try {
    const response = await axios.get(`https://bot.latambank.com.br/notification/quote?symbol=${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cotação:', error);
    throw new Error('Erro ao buscar cotação');
  }
};
