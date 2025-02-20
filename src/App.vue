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

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useTelegramStore } from '@/stores/telegramStore';
import Header from '@/components/Header.vue';

const telegramStore = useTelegramStore();

onMounted(() => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.expand();
    telegramStore.setUser(tg.initDataUnsafe?.user || null);
  }
});
</script>
