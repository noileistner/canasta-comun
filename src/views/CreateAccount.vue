<script setup>
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";

const userName = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

const createAccount = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully registered");
      router.push("/");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
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
      console.log("there has been an error");
    });
};
</script>

<template>
  <v-container class="create-account-input">
    <h1 style="padding-left: 25%">Crea una cuenta</h1>
    <v-sheet class="mx-auto create-account-input__details">
      <v-form fast-fail @submit.prevent>
        <v-text-field v-model="userName" label="Nombre"></v-text-field>

        <v-text-field v-model="email" label="Email"></v-text-field>

        <v-text-field
          v-model="password"
          label="Contraseña"
          type="password"
          hint="Idk yet"
        ></v-text-field>

        <v-btn
          @click="createAccount"
          type="submit"
          rounded
          width="100%"
          class="mt-2"
          color="tertiary"
          >Someter</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          @click="signInWithGoogle"
          type="submit"
          rounded
          width="100%"
          class="mt-2"
          color="secondary"
          >Crear cuenta con Google</v-btn
        >
      </v-form>
    </v-sheet>
  </v-container>
</template>

<style scoped>
.create-account-input {
  padding-bottom: 188px;
  justify-content: center;
}

.create-account-input__details {
  padding-top: 10px;
  width: 50%;
}
</style>
