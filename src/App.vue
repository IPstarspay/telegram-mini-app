<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        expand: () => void;
        close: () => void;
        initDataUnsafe?: { user?: TelegramUser };
      };
    };
  }
}

const user = ref<TelegramUser | null>(null);
const tg = window.Telegram?.WebApp;

onMounted(() => {
  if (tg) {
    tg.expand();
    console.log("Dados recebidos do Telegram:", tg.initDataUnsafe);
    user.value = tg.initDataUnsafe?.user || null;
  }
});
</script>


<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
    <h1 class="text-2xl font-bold">Meu Mini App</h1>
    <p v-if="user" class="text-lg mt-2">Bem-vindo, {{ user.first_name }}!</p>
    <p v-else class="text-lg mt-2">Carregando...</p>
    <button v-if="tg" @click="tg.close()" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
      Fechar App
    </button>
  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
}
</style>
