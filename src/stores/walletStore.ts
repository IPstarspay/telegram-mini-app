import { defineStore } from 'pinia';
import { TonConnectUI } from '@tonconnect/ui';
import { createAccount, type walletData } from '@/services/walletService';
import { useTelegramStore } from '@/stores/telegramStore';

export const useWalletStore = defineStore('quote', {
    state: () => ({
        wallet: null as walletData | null,
        loading: false,
        error: null as string | null,
        tonConnect: null as TonConnectUI | null,
        walletInfo: null as { address: string; publicKey: string } | null,
        connected: false,
    }),
    actions: {
        initializeTonConnect() {
            if (!document.getElementById('ton-connect-button')) {
                console.error('Elemento ton-connect-button não encontrado!');
                return;
            }

            this.tonConnect = new TonConnectUI({
                manifestUrl: 'https://visionary-faun-fc94b6.netlify.app/tonconnect-manifest.json',
                buttonRootId: 'ton-connect-button',
            });

            this.tonConnect.onStatusChange((wallet) => {
                this.connected = !!wallet;
                if (wallet) {
                    this.walletInfo = {
                        address: wallet.account.address ?? '',
                        publicKey: wallet.account.publicKey ?? '',
                    };
                }
            });
        },

        async sendWalletToBackend() {
            const telegramStore = useTelegramStore();

            if (this.walletInfo && telegramStore.user?.id) {
                try {
                    const response = await fetch('/api/link-wallet', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            telegram_id: telegramStore.user.id,
                            ...this.walletInfo
                        }),
                    });

                    if (!response.ok) throw new Error('Falha ao vincular carteira');
                    console.log('Carteira vinculada com sucesso!');
                } catch (error) {
                    console.error('Erro:', error);
                }
            }
        },

        disconnectWallet() {
            this.tonConnect?.disconnect();
            this.walletInfo = null;
            this.connected = false;
        },

        async createAccount(telegram_id: number, name: string, document: number, birthdate: string) {
            this.loading = true;
            this.error = null;
            try {
                this.wallet = await createAccount(telegram_id, name, document, birthdate, this.walletInfo?.address ?? '', this.walletInfo?.publicKey ?? '');
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
