<template>
  <div>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Mini App do Telegram</v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
    >
      <v-list>
        <v-list-item
          to="/opening-acount"
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-bank</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Abertura de Conta</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          to="/quote"
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-chart-line</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Cotação</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          to="/toncoin"
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-currency-usd</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Compra e Venda de TON</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const drawer = ref(false);
</script>