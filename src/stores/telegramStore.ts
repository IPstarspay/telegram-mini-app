import { defineStore } from 'pinia';

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
}

interface TelegramWebApp {
  expand: () => void;
  close: () => void;
  initDataUnsafe?: { user?: TelegramUser };
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export const useTelegramStore = defineStore('telegram', {
  state: () => ({
    user: null as TelegramUser | null,
  }),
  actions: {
    setUser(user: TelegramUser | null) {
      this.user = user;
    },
  },
});
