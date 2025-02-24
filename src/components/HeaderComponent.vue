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
      <v-list lines="two">
        <v-list-item
          title="Cotação"
          subtitle="Consulte a cotação de moedas"
          prepend-icon="mdi-chart-line"
          to="/quote"
          link
        />

        <v-list-item
          title="Conta"
          subtitle="Abra sua conta"
          prepend-icon="mdi-bank"
          to="/opening-acount"
          link
        />

        <v-list-item
          title="TON"
          subtitle="Compre e venda TON"
          prepend-icon="mdi-currency-usd"
          to="/toncoin"
          link
        />
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderComponent',
  setup() {
    const drawer = ref(false);

    return {
      drawer,
    };
  },
});
</script>