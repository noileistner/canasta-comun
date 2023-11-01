<script setup>
import { ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";

const userName = ref("");
const email = ref("");
const password = ref("");
const errMsg = ref("");
const router = useRouter();

const register = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully signed in");
      router.push("/");
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid Email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect Password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
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
      //handle error
    });
};
</script>

<template>
  <v-container class="signIn-input">
    <h1 style="padding-left: 25%">Inicia sesión con una cuenta existente</h1>
    <v-sheet class="mx-auto signIn-input__details">
      <v-form fast-fail @submit.prevent>
        <v-text-field v-model="userName" label="Nombre"></v-text-field>

        <v-text-field v-model="email" label="Email"></v-text-field>

        <v-text-field
          v-model="password"
          label="Contraseña"
          type="password"
          hint="Introduzca su contraseña para acceder"
        ></v-text-field>
        <p v-if="errMsg">{{ errMsg }}</p>

        <v-btn
          @click="register"
          type="submit"
          block
          class="mt-2"
          color="tertiary"
          rounded
          width="100%"
          >Someter</v-btn
        >
        <v-btn
          @click="signInWithGoogle"
          type="submit"
          block
          class="mt-2"
          color="secondary"
          rounded
          width="100%"
          >Iniciar sesión con Google</v-btn
        >
      </v-form>
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
