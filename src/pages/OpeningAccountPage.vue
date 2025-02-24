<template>
  <v-container
    fluid
    class="pa-0 fill-height"
    style="background-color: #121212;"
  >
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
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
          <v-card
            dark
            outlined
            class="pa-4"
          >
            <v-card-title class="justify-center text-h5 font-weight-bold">
              Abertura de Conta
            </v-card-title>
            <v-card-text>
              <!-- Nome Completo -->
              <v-text-field
                v-model="formData.fullName"
                label="Nome Completo"
                :rules="nameRules"
                outlined
                dense
                required
                color="primary"
              />
              <!-- Email -->
              <v-text-field
                v-model="formData.email"
                label="Email"
                :rules="emailRules"
                outlined
                dense
                required
                color="primary"
              />
              <!-- Telefone -->
              <v-text-field
                v-model="formData.phone"
                label="Telefone"
                :rules="phoneRules"
                outlined
                dense
                required
                color="primary"
              />
              <!-- CPF -->
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
                v-model:model-value="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template #activator="{ props }">
                  <v-text-field
                    v-model="formData.birthDate"
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
                  @update:model-value="menu = false"
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
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VForm } from 'vuetify/components/VForm';
import { VMenu } from 'vuetify/components/VMenu';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
}

// Obtém a data atual em YYYY-MM-DD
const today = new Date().toISOString().slice(0, 10);

const valid = ref(false);
const form = ref<InstanceType<typeof VForm> | null>(null);
const menu = ref(false);

const formData = ref<FormData>({
  fullName: '',
  email: '',
  phone: '',
  cpf: '',
  birthDate: today,
});

// Regras de validação
const nameRules = [
  (v: string) => !!v || 'Nome é obrigatório',
  (v: string) => (v && v.length >= 3) || 'Nome deve ter pelo menos 3 caracteres',
];

const emailRules = [
  (v: string) => !!v || 'Email é obrigatório',
  (v: string) => /.+@.+\..+/.test(v) || 'Email deve ser válido',
];

const phoneRules = [
  (v: string) => !!v || 'Telefone é obrigatório',
  (v: string) => (v && v.length >= 8) || 'Telefone deve ter pelo menos 8 dígitos',
];

const cpfRules = [
  (v: string) => !!v || 'CPF é obrigatório',
  (v: string) => (v && v.length === 11) || 'CPF deve ter 11 dígitos',
];

const submitForm = (): void => {
  if (form.value?.validate()) {
    // Chame a API ou faça o processamento necessário aqui
    alert('Conta criada com sucesso!');
  }
};
</script>