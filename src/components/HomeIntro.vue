<script setup>
import ContentContainer from "./ContentContainer.vue";
</script>

<template>
  <ContentContainer class="home-intro">
    <v-card variant="flat">
      <h1 class="home-intro__title">Organiza y participa en partidos de básquet</h1>

      <p class="home-intro__description">
        Conecta con amantes del baloncesto para organizar partidos emocionantes. Tanto si eres un jugador experimentado
        como si estás dando tus primeros pasos en la cancha, aprovecha la posibilidad de encontrar compañeros con
        intereses similares. Crea nuevas amistades y disfruta de la emoción del baloncesto como nunca antes.
      </p>

      <!-- TODO: when click button go to create event after signIn  -->
      <router-link :to="{ name: 'CreateEvent' }">
        <v-btn class="home-intro__button" rounded color="secondary" size="large">
          <p class="home-intro__button__text">Organiza un partido</p>
        </v-btn>
      </router-link>

      <router-link :to="{ name: 'CreateAccount' }">
        <v-btn class="home-intro__button" rounded color="tertiary" margin-bottom="10px" size="large">
          Crear cuenta
        </v-btn>
      </router-link>
    </v-card>

    <template #image>
      <v-card variant="flat" min-width="300">
        <v-img class="home-intro__image" src="../images/MainPicture.jpg" alt="foto basquet" height="500" />
      </v-card>
    </template>
  </ContentContainer>
</template>

<style scoped>
.home-intro {
  /* padding-bottom: 50px; */
}
.home-intro__title {
  font-size: 250%;
  font-family: var(--app-font-family);
  line-height: 110%;
  margin-bottom: 20px;
}

.home-intro__description {
  margin-bottom: 25px;
}

.home-intro__button {
  margin-bottom: 15px;
}
.home-intro__button__text {
  font-size: 1.7vh;
}

@media (max-width: 600px) {
  .home-intro__button {
    height: 45px;
    width: 160px;
  }
  .home-intro__image {
    height: 400;
  }
}

.home-intro__image {
  min-width: 280px;
}
</style>
