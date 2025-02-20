<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useQuoteStore } from '@/stores/quoteStore';
import QuoteChart from '@/components/QuoteChart.vue';

const store = useQuoteStore();

// Sempre que o símbolo selecionado mudar, atualiza a cotação
watch(() => store.selectedSymbol, () => {
  store.fetchQuote();
});

onMounted(() => {
  store.fetchQuote();
});
</script>

<template>
  <v-container class="py-4">
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
        class="text-center"
      >
        <h2 class="text-h4 font-weight-bold mb-4">
          Cotação
        </h2>
        <!-- Seleção da moeda -->
        <v-select
          v-model="store.selectedSymbol"
          :items="['TON', 'BTC', 'USDT']"
          label="Selecione a moeda"
          outlined
          class="mb-4"
        />
        <div
          v-if="store.loading"
          class="mb-4"
        >
          Carregando...
        </div>
        <div
          v-else-if="store.error"
          class="mb-4 text-error"
        >
          {{ store.error }}
        </div>
        <div v-else-if="store.quote">
          <p><strong>Preço Atual:</strong> R$ {{ store.quote.price }}</p>
          <p><strong>Máximo 24h:</strong> R$ {{ store.quote.high_24h }}</p>
          <p><strong>Mínimo 24h:</strong> R$ {{ store.quote.low_24h }}</p>
          <!-- Componente do gráfico -->
          <QuoteChart
            :price="store.quote.price"
            :low24h="store.quote.low_24h"
            :high24h="store.quote.high_24h"
            :symbol="store.selectedSymbol"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
