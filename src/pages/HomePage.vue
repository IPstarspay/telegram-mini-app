<template>
  <div class="text-center p-4">
    <h1 class="text-h4 font-weight-bold mb-4">
      Mini App do Telegram
    </h1>
    <p v-if="telegramStore.user">
      Bem-vindo, {{ telegramStore.user.first_name }}!
    </p>

    <!-- Botões de atalho -->
    <div class="mt-6 d-flex flex-column align-center">
      <v-btn
        color="blue"
        to="/quote"
        class="mb-3"
      >
        📊 Ver Cotação
      </v-btn>
      <v-btn
        color="green"
        to="/opening-acount"
        class="mb-3"
      >
        🏦 Abrir Conta
      </v-btn>
      <v-btn
        color="yellow"
        to="/toncoin"
      >
        💰 Comprar TONCoin
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTelegramStore } from '@/stores/telegramStore';
const telegramStore = useTelegramStore();
</script>
