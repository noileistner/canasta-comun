<script setup>
import HomeDescriptionBox from "./HomeDescriptionBox.vue";
</script>

<template>
  <v-container class="home-description">
    <h1 class="home-description__title">Como funciona Canasta Comun</h1>

    <v-row cols="12" sm="4">
      <v-col>
        <HomeDescriptionBox>
          Organiza y juega partidos de basquet
        </HomeDescriptionBox>
      </v-col>
      <v-col>
        <HomeDescriptionBox>
          Busca amigos con intereses comunes
        </HomeDescriptionBox>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.home-description {
  width: 100%;
  max-width: 100%;
  background: rgb(var(--v-theme-primary));
  text-align: center;
  padding-top: 20px;
  font-family: var(--app-font-family);
}

.home-description__title {
  color: #fff;
}
</style>
