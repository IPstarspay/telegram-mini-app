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
        <v-card-text>
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
            v-model="formData.email"
            label="Email"
            :rules="emailRules"
            outlined
            dense
            required
            color="primary"
          />
          <v-text-field
            v-model="formData.phone"
            label="Telefone"
            :rules="phoneRules"
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
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'OpeningAccountPage',
  setup() {
    const formData = ref({
      fullName: '',
      email: '',
      phone: '',
      cpf: '',
      birthDate: null as Date | null,
    });

    const nameRules = [(v: string) => !!v || 'Nome é obrigatório'];

    const emailRules = [
      (v: string) => !!v || 'Email é obrigatório',
      (v: string) => /.+@.+\..+/.test(v) || 'Email deve ser válido',
    ];

    const phoneRules = [
      (v: string) => !!v || 'Telefone é obrigatório',
      (v: string) => v.length === 11 || 'Telefone deve ter 11 dígitos',
    ];

    const cpfRules = [
      (v: string) => !!v || 'CPF é obrigatório',
      (v: string) => v.length === 11 || 'CPF deve ter 11 dígitos',
    ];

    const valid = ref(false);
    const menu = ref(false);

    // Formata a data para exibição no input
    const formattedDate = computed(() => {
      return formData.value.birthDate
        ? formData.value.birthDate.toLocaleDateString('pt-BR')
        : '';
    });

    // Atualiza a data formatada quando o usuário seleciona uma nova data
    const updateFormattedDate = (date: Date | null) => {
      formData.value.birthDate = date;
      menu.value = false;
    };

    const submitForm = () => {
      if (valid.value) {
        console.log('Formulário válido', formData.value);
      }
    };

    return {
      formData,
      nameRules,
      emailRules,
      phoneRules,
      cpfRules,
      valid,
      menu,
      formattedDate,
      updateFormattedDate,
      submitForm,
    };
  },
});
</script>
