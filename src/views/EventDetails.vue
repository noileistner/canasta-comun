<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;
</script>

<template>
  <h1>Detalles del Evento</h1>
  {{ id }}
</template>

<style scoped></style>
