<template>
  <v-container
    fluid
    class="pa-4"
    style="background-color: #121212; min-height: 100vh;"
  >
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="6"
      >
        <!-- Card com tema dark para manter a consistência -->
        <v-card
          dark
          class="pa-4"
          outlined
        >
          <v-card-title class="justify-center">
            <span class="headline font-weight-bold">Mini App do Telegram</span>
          </v-card-title>
          <v-card-text class="text-center">
            <p
              v-if="telegramStore.user"
              class="subtitle-1"
            >
              Olá, {{ telegramStore.user.first_name }}!
            </p>
          </v-card-text>
          <v-divider class="my-4" />
          <v-card-text>
            <v-btn
              block
              color="primary"
              :to="{ name: '/QuotePage' }"
              class="my-2"
              large
              dark
            >
              <v-icon left>
                mdi-chart-line
              </v-icon>
              Ver Cotação
            </v-btn>
            <v-btn
              block
              color="secondary"
              :to="{ name: '/OpeningAccountPage' }"
              class="my-2"
              large
              dark
            >
              <v-icon left>
                mdi-bank
              </v-icon>
              Abrir Conta
            </v-btn>
            <v-btn
              block
              color="info"
              :to="{ name: '/TonCoinPage' }"
              class="my-2"
              large
              dark
            >
              <v-icon left>
                mdi-currency-usd
              </v-icon>
              Comprar TONCoin
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useTelegramStore } from '@/stores/telegramStore';
const telegramStore = useTelegramStore();
</script>
