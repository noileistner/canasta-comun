<script setup>
import { useSessionStore } from "../store/session";
import { storeToRefs } from "pinia";

const { isLoggedIn } = storeToRefs(useSessionStore());
</script>

<template>
  <div class="footer">
    <router-link to="/contactanos">Contactanos</router-link>
    <router-link to="/sobre"> Sobre </router-link>
    <router-link to="/crear-cuenta" v-if="!isLoggedIn">Crear cuenta</router-link>
    <router-link to="/blog">Blog</router-link>
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
