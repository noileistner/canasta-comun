<script setup>
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup } from "firebase/auth";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const { handleSubmit } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 3 && value?.length <= 23) return true;

      return "Nombre tiene que tener un mínimo de 3 caracteres y un máximo de 23.";
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

const submit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  await createAccount(values);
  isSubmitting.value = false;
});

async function createAccount(attributes) {
  const { name, email, password } = attributes;
  try {
    await createUserWithEmailAndPassword(getAuth(), email, password);
    // TODO: create profile with name
    router.push("/");
  } catch (error) {
    console.log(error.code);
  }
}

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
    <v-card class="mx-auto pb-8" max-width="800" elevation="0">
      <h1 class="create-account__title">Crea una cuenta</h1>
      <v-form fast-fail @submit.prevent="submit">
        <v-text-field
          v-model="name.value.value"
          :error-messages="name.errorMessage.value"
          label="Nombre"
        ></v-text-field>

        <v-text-field
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password.value.value"
          :error-messages="password.errorMessage.value"
          label="Contraseña"
          type="password"
          hint="Introduzca una contraseña con un mínimo de 6 caracteres"
        />

        <v-btn :loading="isSubmitting" type="submit" rounded width="100%" class="mt-2" color="tertiary"
          >Continuar</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn @click="signInWithGoogle" rounded width="100%" class="mt-2" color="secondary">
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
