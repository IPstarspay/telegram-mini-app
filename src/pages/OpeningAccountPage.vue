<template>
  <v-row justify="center">
    <v-col
      cols="12"
      sm="10"
      md="8"
      lg="6"
    >
      <v-card
        dark
        outlined
        class="pa-4"
      >
        <v-card-title class="justify-center text-h5 font-weight-bold">
          Abertura de Conta
        </v-card-title>

        <!-- Mensagem de sucesso -->
        <v-alert
          v-if="successMessage"
          type="success"
          class="mb-4"
          dismissible
        >
          {{ successMessage }}
        </v-alert>

        <v-card-text v-if="!walletStore.connected">
          <v-alert
            type="info"
            class="mb-4"
          >
            Para abrir uma conta, primeiro conecte sua carteira TON
          </v-alert>

          <div id="ton-connect-button" />
        </v-card-text>

        <v-card-text v-else>
          <v-alert
            type="success"
            class="mb-4"
          >
            Carteira conectada: {{ shortAddress(walletStore.walletInfo?.address) }}
          </v-alert>

          <!-- Campos do formulário -->
          <v-text-field
            v-model="formData.fullName"
            label="Nome Completo"
            :rules="nameRules"
            outlined
            dense
            required
            color="primary"
          />

          <v-text-field
            v-model="formData.cpf"
            label="CPF (somente números)"
            :rules="cpfRules"
            outlined
            dense
            required
            color="primary"
          />

          <!-- Data de Nascimento -->
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template #activator="{ props }">
              <v-text-field
                v-model="formattedDate"
                label="Data de Nascimento"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="props"
                outlined
                dense
                required
                color="primary"
              />
            </template>
            <v-date-picker
              v-model="formData.birthDate"
              no-title
              @update:model-value="updateFormattedDate"
            />
          </v-menu>

          <!-- Botões -->
          <v-row
            class="mt-4"
            justify="center"
          >
            <v-col
              cols="12"
              sm="6"
            >
              <v-btn
                color="primary"
                block
                :disabled="!valid"
                @click="submitForm"
              >
                Criar Conta
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-btn
                color="grey"
                block
                to="/"
              >
                Voltar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useWalletStore } from '@/stores/walletStore';
import { useTelegramStore } from '@/stores/telegramStore';

export default defineComponent({
  name: 'OpeningAccountPage',
  setup() {
    const formData = ref({
      fullName: '',
      cpf: '',
      birthDate: null as Date | null,
    });

    const walletStore = useWalletStore();
    const telegramStore = useTelegramStore();
    const successMessage = ref<string | null>(null); // 🔹 Adicionando estado para sucesso

    onMounted(() => {
      setTimeout(() => {
        walletStore.initializeTonConnect();
      }, 100);
    });

    const shortAddress = (address?: string) => {
      return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
    };

    const nameRules = [(v: string) => !!v || 'Nome é obrigatório'];
    const cpfRules = [
      (v: string) => !!v || 'CPF é obrigatório',
      (v: string) => v.length === 11 || 'CPF deve ter 11 dígitos',
    ];

    const valid = computed(() => {
      return (
        formData.value.fullName.trim() !== '' &&
        /^\d{11}$/.test(formData.value.cpf) &&
        formData.value.birthDate !== null
      );
    });

    const menu = ref(false);

    const formattedDate = computed(() => {
      return formData.value.birthDate ? formData.value.birthDate.toLocaleDateString('pt-BR') : '';
    });

    const updateFormattedDate = (date: Date | null) => {
      formData.value.birthDate = date;
      menu.value = false;
    };

    const submitForm = async () => {
      if (!valid.value) return;

      if (!telegramStore.user) {
        console.error('Usuário do Telegram não encontrado.');
        return;
      }

      const cpfNumber = Number(formData.value.cpf);
      if (isNaN(cpfNumber)) {
        console.error('CPF inválido.');
        return;
      }

      const birthDateString = formData.value.birthDate
        ? formData.value.birthDate.toLocaleDateString('pt-BR')
        : '';

      try {
        await walletStore.createAccount(
          telegramStore.user?.id,
          formData.value.fullName,
          cpfNumber,
          birthDateString,
        );

        // 🔹 Define a mensagem de sucesso
        successMessage.value = 'Conta criada com sucesso!';
      } catch (error) {
        console.error('Erro ao criar conta:', error);
      }
    };

    return {
      formData,
      nameRules,
      cpfRules,
      valid,
      menu,
      formattedDate,
      updateFormattedDate,
      submitForm,
      walletStore,
      shortAddress,
      successMessage, // 🔹 Retornando para o template
    };
  },
});
</script>

<style scoped>
#ton-connect-button {
  margin: 16px 0;
}

#ton-connect-button tonconnect-button {
  width: 100%;
  height: 40px;
}
</style>
