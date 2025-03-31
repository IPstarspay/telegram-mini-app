<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useTelegramStore } from '@/stores/telegramStore';
// import { useWalletStore } from '@/stores/walletStore';
import Header from '@/components/HeaderComponent.vue';

const telegramStore = useTelegramStore();

onMounted(() => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.expand();
    telegramStore.setUser(tg.initDataUnsafe?.user || null);

    // const walletStore = useWalletStore();
    // walletStore.initializeTonConnect();
  }
});
</script>
