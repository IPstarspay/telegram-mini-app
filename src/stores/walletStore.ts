import { defineStore } from 'pinia';
import { createAccount, type walletData } from '@/services/walletService';

export const useWalletStore = defineStore('quote', {
    state: () => ({
        wallet: null as walletData | null,
        loading: false,
        error: null as string | null,
    }),
    actions: {
        // async fetchQuote() {
        //     this.loading = true;
        //     this.error = null;
        //     try {
        //         const data = await getQuote(this.selectedSymbol);
        //         this.wallet = data;
        //     } catch (error) {
        //         console.error('Erro ao buscar cotação:', error);
        //         this.error = 'Erro ao buscar cotação';
        //         this.wallet = null;
        //     } finally {
        //         this.loading = false;
        //     }
        // },
        async createAccount(telegram_id: number, name: string, document: number, birthdate: string) {
            this.loading = true;
            this.error = null;
            try {
                this.wallet = await createAccount(telegram_id, name, document, birthdate);
            }
            catch (error) {
                console.error('Erro ao registar o usuário:', error);
                this.error = 'Erro ao registar o usuário';
                this.wallet = null;
            } finally {
                this.loading = false;
            }
        }
    },
});
