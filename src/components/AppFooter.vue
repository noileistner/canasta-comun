<script setup>
import { storeToRefs } from "pinia";
import { useSessionStore } from "../store/session";

const { isLoggedIn } = storeToRefs(useSessionStore());
</script>

<template>
  <div class="footer">
    <router-link :to="{ name: 'ContactUs' }">
      <p class="footer__word">Contáctanos</p>
    </router-link>
    <router-link :to="{ name: 'AboutMe' }">
      <p class="footer__word">Sobre</p>
    </router-link>
    <router-link :to="{ name: 'CreateAccount' }" v-if="!isLoggedIn">
      <p class="footer__word">Crear cuenta</p>
    </router-link>
  </div>
</template>

<style scoped>
.footer {
  position: static;
  margin: auto;
  padding: 25px;
  background: rgb(var(--v-theme-primary));
  color: white;
  display: flex;
  justify-content: center;
  border-top: 7px solid rgb(var(--v-theme-secondary));
  z-index: 2;
}

.footer__word {
  font-size: 2vh;
}

.footer a {
  display: inline-block;
  margin-right: 40px;
  color: white;
  opacity: 0.7;
  transition: 0.2 ease color;
}
.footer a.router-link-active,
.footer a:hover {
  opacity: 1;
}
</style>
