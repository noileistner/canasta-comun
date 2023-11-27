<script setup>
import { useSessionStore } from "@/store/session";
import { useUserStore } from "@/store/user";
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { setCurrentUser } = useSessionStore();
const { findByEmail } = useUserStore();

const email = ref("");
const password = ref("");
const errMsg = ref("");
const router = useRouter();

async function signInWithCredentials() {
  const userProvider = async () => await signInWithEmailAndPassword(getAuth(), email.value, password.value);

  signIn(userProvider);
}

async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const userProvider = async () => await signInWithPopup(getAuth(), provider);

  signIn(userProvider);
}

const error = ref(null);
const isSubmitting = ref(false);

async function signIn(userProvider) {
  try {
    error.value = null;
    isSubmitting.value = true;

    const { user } = await userProvider();
    const currentUser = await findByEmail(user.email);
    setCurrentUser(currentUser);

    router.push({ name: "HomePage" });
  } catch (e) {
    console.log(e.code);

    const errorCodeMapping = {
      "auth/invalid-email": "Invalid Email",
      "auth/user-not-found": "No account with that email was found",
      "auth/wrong-password": "Incorrect Password",
      default: "Email or password was incorrect",
    };

    error.value = errorCodeMapping[e.code] ?? errorCodeMapping.default;
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <v-container class="signIn-input">
    <v-alert type="error" v-if="error" :text="error" />

    <v-card class="mx-auto pb-8" max-width="800" elevation="0">
      <h1 class="signIn__title">Inicia sesión con una cuenta existente</h1>

      <v-form fast-fail @submit.prevent>
        <v-text-field v-model="email" label="Email"></v-text-field>

        <v-text-field
          v-model="password"
          label="Contraseña"
          type="password"
          hint="Introduzca su contraseña para acceder"
        />
        <p v-if="errMsg">{{ errMsg }}</p>

        <div class="signIn__btns">
          <v-btn
            @click="signInWithCredentials"
            :loading="isSubmitting"
            type="submit"
            block
            class="mt-2"
            color="tertiary"
            rounded
          >
            <p class="signIn__btn">Continuar</p>
          </v-btn>
          <v-btn @click="signInWithGoogle" type="submit" block class="mt-2" color="secondary" rounded>
            <p class="signIn__btn">Iniciar sesión con Google</p>
          </v-btn>
        </div>
      </v-form>

      <v-card-text class="text-center">
        Aun no tienes cuenta?
        <router-link class="router-link" :to="{ name: 'CreateAccount' }"> Crear cuenta </router-link>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.signIn-input {
  width: 70%;
}
.signIn__title {
  font-family: var(--app-font-family);
}
.signIn__btns {
  display: grid;
  justify-content: center;
}

@media (max-width: 600px) {
  .signIn-input {
    width: 90%;
    padding: 0;
  }
  .signIn__title {
    font-size: 3vh;
  }
}

.router-link {
  color: rgb(var(--v-theme-tertiary));
}
</style>
