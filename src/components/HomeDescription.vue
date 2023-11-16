<script setup>
import HomeDescriptionBox from "./HomeDescriptionBox.vue";
</script>

<template>
  <v-container class="home-description">
    <h1 class="home-description__title">Como funciona Canastacomun</h1>

    <v-row cols="12" sm="4">
      <v-col>
        <HomeDescriptionBox icon="search">
          <p class="home-description__text">Busca amigos con intereses comunes</p>

          <p class="home-description__sub-text">Crea nuevas amistades</p>
          <router-link :to="{ name: 'CreateAccount' }">
            <!-- TODO: make link go somewhere -->
            <p class="home-description__cta">Descubre otros aficionados</p>
          </router-link>
        </HomeDescriptionBox>
      </v-col>
      <v-col>
        <HomeDescriptionBox icon="edit">
          <p class="home-description__text">Organiza y juega partidos de basquet</p>

          <p class="home-description__sub-text">Prueba tus habilidades y diviértete</p>
          <router-link :to="{ name: 'CreateEvent' }">
            <p class="home-description__cta">Organiza un partido</p>
          </router-link>
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
  display: grid;
  text-align: center;
  justify-content: center;
  padding-top: 20px;
  font-family: var(--app-font-family);
}

.home-description__title {
  color: #fff;
  font-size: 5vh;
  padding-bottom: 20px;
}
.home-description__text {
  font-size: 120%;
}

.home-description__sub-text {
  opacity: 0.7;
  font-size: 100%;
}
.home-description__cta {
  font-size: 110%;
  color: #1b8f7c;
  padding-top: 8px;
}

@media (min-width: 800px) {
  .home-description__text {
    font-size: 150%;
  }
  .home-description__sub-text {
    font-size: 130%;
  }
  .home-description__cta {
    font-size: 140%;
  }
}
</style>
