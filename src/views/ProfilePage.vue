<script setup>
import { signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
let auth;

function handleSignOut() {
  // FIXME: causes an error on signout
  signOut(auth).then(() => {
    router.push("/");
  });
}
</script>

<template>
  <v-btn
    class="sign-out-btn"
    rounded
    color="secondary"
    margin-bottom="10px"
    size="large"
    @click="handleSignOut"
    >Cerrar sesión</v-btn
  >
</template>
