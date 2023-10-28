<script setup>
import HomeDescriptionBox from "./HomeDescriptionBox.vue";
</script>

<template>
  <v-container class="home-description">
    <h1 class="home-description__title">Como funciona Canasta Comun</h1>

    <v-row cols="12" sm="4">
      <v-col>
        <HomeDescriptionBox icon="search">
          Busca amigos con intereses comunes

          <p class="home-description__sub-text">
            Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,
          </p>
          <router-link to="/">
            <p class="home-description__cta">Descubre otros aficionados</p>
          </router-link>
        </HomeDescriptionBox>
      </v-col>
      <v-col>
        <HomeDescriptionBox icon="tachometer-alt">
          Organiza y juega partidos de basquet

          <p class="home-description__sub-text">
            Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,
          </p>
          <router-link to="/crear-partido">
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
  text-align: center;
  justify-content: center;
  padding-top: 20px;
  font-family: var(--app-font-family);
}

.home-description__title {
  color: #fff;
  font-size: 2.5rem;
  padding-bottom: 20px;
}

.home-description__sub-text {
  opacity: 0.7;
  font-size: 50%;
}

@media (min-width: 1125px) {
  .home-description__sub-text {
    font-size: 70%;
  }
}

.home-description__cta {
  font-size: 1.5vw;
  color: #1b8f7c;
  padding-top: 8px;
}
</style>
