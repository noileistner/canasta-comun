<script setup>
import { useField, useForm } from "vee-validate";
import { ref } from "vue";

// const email = ref("");
// const subject = ref("");
// const message = ref("");

const { handleSubmit } = useForm({
  validationSchema: {
    email(value) {
      if (value?.length >= 5 && value?.length <= 23) return true;

      return "Nombre tiene que tener un mínimo de 5 caracteres y un máximo de 23.";
    },
    subject(value) {
      if (value?.length) return true;

      return "Fecha tiene que estar en el futuro.";
    },
    message(value) {
      if (value?.length) return true;

      return "Fecha invalida.";
    },
  },
});

const email = useField("email");
const subject = useField("subject");
const message = useField("message");

const submit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  await addEvent(values);
  isSubmitting.value = false;
});

const isSubmitting = ref(false);
const error = ref(false);
</script>

<template>
  <v-container class="contact">
    <v-card class="mx-auto pa-12 pb-8" max-width="800" elevation="0">
      <h1 class="contact__title">Contacta con nosotros</h1>

      <v-form fast-fail @submit.prevent="submit">
        <v-text-field v-model="email" label="Email"></v-text-field>

        <v-text-field v-model="subject" label="Asunto" hint="Introduzca el asunto del mensaje" />

        <v-textarea label="Mensaje" v-model="message" />

        <v-btn :loading="isSubmitting" type="submit" block class="mt-2" color="secondary" rounded>Enviar mensaje</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<style scoped>
.contact__title {
  font-family: var(--app-font-family);
}
</style>
