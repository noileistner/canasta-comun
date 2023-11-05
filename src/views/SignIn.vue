<script setup>
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errMsg = ref("");
const router = useRouter();

const register = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully signed in", data);
      router.push("/");
    })
    .catch((error) => {
      console.log(error.code);

      const errorCodeMapping = {
        "auth/invalid-email": "Invalid Email",
        "auth/user-not-found": "No account with that email was found",
        "auth/wrong-password": "Incorrect Password",
        default: "Email or password was incorrect",
      };

      return errorCodeMapping[error.code] ?? errorCodeMapping.default;
    });
};
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push("/");
    })
    .catch((error) => {
      console.error(error);
      //handle error
    });
};
</script>

<template>
  <v-container class="signIn-input">
    <v-card class="mx-auto pa-12 pb-8" max-width="800" elevation="0">
      <h1>Inicia sesión con una cuenta existente</h1>
      <v-form fast-fail @submit.prevent>
        <v-text-field v-model="email" label="Email"></v-text-field>

        <v-text-field
          v-model="password"
          label="Contraseña"
          type="password"
          hint="Introduzca su contraseña para acceder"
        />
        <p v-if="errMsg">{{ errMsg }}</p>

        <v-btn @click="register" type="submit" block class="mt-2" color="tertiary" rounded>Someter</v-btn>
        <v-btn @click="signInWithGoogle" type="submit" block class="mt-2" color="secondary" rounded>
          Iniciar sesión con Google
        </v-btn>
      </v-form>
      <v-card-text class="text-center">
        Aun no tienes cuenta?
        <router-link :to="{ name: 'CreateAccount' }" color="secondary"> Crear cuenta </router-link>
      </v-card-text>
    </v-card>
  </v-container>
</template>
