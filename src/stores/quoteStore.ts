import { defineStore } from 'pinia';
import { getQuote, type QuoteData } from '@/services/quoteService';

export const useQuoteStore = defineStore('quote', {
  state: () => ({
    quote: null as QuoteData | null,
    selectedSymbol: 'TON',
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchQuote() {
      this.loading = true;
      this.error = null;
      try {
        const data = await getQuote(this.selectedSymbol);
        this.quote = data;
      } catch (error) {
        console.error('Erro ao buscar cotação:', error);
        this.error = 'Erro ao buscar cotação';
        this.quote = null;
      } finally {
        this.loading = false;
      }
    },
    setSelectedSymbol(symbol: string) {
      this.selectedSymbol = symbol;
    },
    setQuote(data: QuoteData) {
      this.quote = data;
    }
  },
});
