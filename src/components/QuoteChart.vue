<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import { useQuoteStore } from '@/stores/quoteStore';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const store = useQuoteStore();

// Função auxiliar para arredondar para 2 casas decimais
const round2 = (num: number): number => Number(num.toFixed(2));

const computedChartData = computed(() => {
  if (!store.quote) return null;
  
  // Converte o preço atual (string) para número
  const currentPrice = parseFloat(store.quote.price.replace(',', '.'));
  
  // Calcula o preço de 1h atrás
  const p1h = currentPrice / (1 + store.quote.percent_change_1h / 100);
  
  // Para 24h, converte a string removendo '%' e vírgula
  const percent24hStr = store.quote.percent_change_24h.replace('%','').trim();
  const percent24h = parseFloat(percent24hStr.replace(',', '.'));
  const p24h = currentPrice / (1 + percent24h / 100);
  
  // Calcula o preço de 7d atrás
  const p7d = currentPrice / (1 + store.quote.percent_change_7d / 100);
  
  return {
    labels: ['7 dias', '24h', '1h', 'Agora'],
    datasets: [
      {
        label: `Evolução do Preço - ${store.selectedSymbol}`,
        data: [round2(p7d), round2(p24h), round2(p1h), round2(currentPrice)],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Evolução do Preço',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Tempo',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Preço (R$)',
      },
      beginAtZero: false,
    },
  },
};
</script>

<template>
  <!-- Usando um v-card do Vuetify para enquadrar o gráfico -->
  <v-card
    class="mx-auto my-4"
    max-width="400"
    outlined
  >
    <v-card-title class="justify-center">
      Histórico de Preço
    </v-card-title>
    <v-card-text>
      <div
        v-if="computedChartData"
        style="height: 300px;"
      >
        <Line
          :data="computedChartData"
          :options="chartOptions"
        />
      </div>
      <div
        v-else
        class="text-center"
      >
        Dados não disponíveis
      </div>
    </v-card-text>
  </v-card>
</template>
