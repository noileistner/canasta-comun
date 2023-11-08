<script setup>
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const userName = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

const createAccount = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      console.log("Successfully registered");
      router.push("/");
    })
    .catch((error) => {
      console.log(error.code);
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      console.log("no error all good");
      router.push("/");
    })
    .catch((error) => {
      console.log("there has been an error", error);
    });
};
</script>

<template>
  <v-container class="create-account-input">
    <v-card class="mx-auto pa-12 pb-8" max-width="800" elevation="0">
      <h1 class="create-account__title">Crea una cuenta</h1>
      <v-form fast-fail @submit.prevent>
        <v-text-field v-model="userName" label="Nombre"></v-text-field>

        <v-text-field v-model="email" label="Email"></v-text-field>

        <v-text-field
          v-model="password"
          label="Contraseña"
          type="password"
          hint="Introduzca una contraseña con un mínimo de 6 caracteres"
        />

        <v-btn @click="createAccount" type="submit" rounded width="100%" class="mt-2" color="tertiary">Someter</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="signInWithGoogle" type="submit" rounded width="100%" class="mt-2" color="secondary">
          Crear cuenta con Google
        </v-btn>
      </v-form>
      <v-card-text class="text-center">
        Ya tienes cuenta?
        <router-link :to="{ name: 'SignIn' }" color="secondary"> Iniciar sesión </router-link>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.create-account__title {
  font-family: var(--app-font-family);
}
</style>
