<script setup>
import { useSessionStore } from "@/store/session";
import { useUserStore } from "@/store/user";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup } from "firebase/auth";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { setCurrentUser } = useSessionStore();
const { findOrCreateByEmail } = useUserStore();

const router = useRouter();

const { handleSubmit } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 3 && value?.length <= 25) return true;

      return "Nombre tiene que tener un mínimo de 3 caracteres y un máximo de 25.";
    },
    email(value) {
      if (value?.length) return true;

      return "Email inválido.";
    },
    password(value) {
      if (value?.length) return true;

      return "Contaseña inválida.";
    },
  },
});

const name = useField("name");
const email = useField("email");
const password = useField("password");

const isSubmitting = ref(false);
const error = ref(null);

const submit = handleSubmit(async (values) => {
  await createAccountWithCredentials(values);
});

async function createAccountWithCredentials(attributes) {
  const { name, email, password } = attributes;
  const userProvider = async () => await createUserWithEmailAndPassword(getAuth(), email, password);

  createAccount(userProvider, name);
}

async function createAccountWithGoogle() {
  const provider = new GoogleAuthProvider();
  const userProvider = async () => await signInWithPopup(getAuth(), provider);

  createAccount(userProvider);
}

async function createAccount(userProvider, name) {
  try {
    error.value = null;
    isSubmitting.value = true;

    const { user } = await userProvider();
    const currentUser = await findOrCreateByEmail(user.email, { name: name ?? user.displaName });
    setCurrentUser(currentUser);

    router.push({ name: "HomePage" });
  } catch (e) {
    error.value = e.message;
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <v-container class="create-account-input">
    <v-alert type="error" v-if="error" :text="error" />

    <v-card class="mx-auto pb-8" max-width="800" elevation="0">
      <h1 class="create-account__title">Crea una cuenta</h1>

      <v-form fast-fail @submit.prevent="submit">
        <v-text-field
          v-model="name.value.value"
          :error-messages="name.errorMessage.value"
          label="Nombre"
          maxlength="25"
        />

        <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" label="Email" />

        <v-text-field
          v-model="password.value.value"
          :error-messages="password.errorMessage.value"
          label="Contraseña"
          type="password"
          hint="Introduzca una contraseña con un mínimo de 6 caracteres"
        />

        <v-btn :loading="isSubmitting" type="submit" rounded width="100%" class="mt-2" color="tertiary">
          Continuar
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn @click="createAccountWithGoogle" rounded width="100%" class="mt-2" color="secondary">
          Crear cuenta con Google
        </v-btn>
      </v-form>

      <v-card-text class="text-center">
        Ya tienes cuenta?
        <router-link :to="{ name: 'SignIn' }" style="color: #48a67c"> Iniciar sesión </router-link>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.create-account-input {
  width: 70%;
}
.create-account__title {
  font-family: var(--app-font-family);
}

@media (max-width: 600px) {
  .create-account-input {
    width: 90%;
    padding: 0;
  }
  .create-account__title {
    font-size: 3vh;
  }
}
</style>
