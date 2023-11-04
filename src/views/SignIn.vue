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
    <h1 style="padding-left: 25%">Inicia sesión con una cuenta existente</h1>
    <v-sheet class="mx-auto signIn-input__details">
      <v-form fast-fail @submit.prevent>
        <v-text-field v-model="email" label="Email"></v-text-field>

        <v-text-field
          v-model="password"
          label="Contraseña"
          type="password"
          hint="Introduzca su contraseña para acceder"
        />
        <p v-if="errMsg">{{ errMsg }}</p>

        <v-btn @click="register" type="submit" block class="mt-2" color="tertiary" rounded width="100%">Someter</v-btn>
        <v-btn @click="signInWithGoogle" type="submit" block class="mt-2" color="secondary" rounded width="100%">
          Iniciar sesión con Google
        </v-btn>
      </v-form>
      <router-link :to="{ name: 'CreateAccount' }">Crear cuenta nueva</router-link>
    </v-sheet>
  </v-container>
</template>

<style scoped>
.signIn-input {
  padding-bottom: 188px;
  justify-content: center;
}
.signIn-input__details {
  padding-top: 10px;
  width: 50%;
}
</style>
