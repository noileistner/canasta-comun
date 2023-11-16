<template>
  <v-container class="home-intro">
    <v-row>
      <v-col>
        <h1 class="home-intro__title">Encuentra compañeros de basquet</h1>

        <p class="home-intro__description">
          Conecta con amantes del baloncesto para organizar partidos emocionantes. Tanto si eres un jugador
          experimentado como si estás dando tus primeros pasos en la cancha, aprovecha la posibilidad de encontrar
          compañeros con intereses similares. Crea nuevas amistades y disfruta de la emoción del baloncesto como nunca
          antes.
        </p>

        <router-link :to="{ name: 'CreateEvent' }">
          <v-btn class="home-intro__button" rounded color="secondary" size="large">Organiza un partido</v-btn>
        </router-link>

        <router-link :to="{ name: 'CreateAccount' }">
          <v-btn class="home-intro__button" rounded color="tertiary" margin-bottom="10px" size="large">
            Crear cuenta</v-btn
          >
        </router-link>
      </v-col>

      <v-col>
        <v-img class="home-intro__image" src="../images/MainPicture.jpg" alt="foto basquet" height="500" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.home-intro {
  padding-bottom: 50px;
  /* max-width: 1800px;
  display: flex;
  flex-direction: column;
  align-items: center; */
}
.home-intro__title {
  font-size: 7vh;
  font-family: var(--app-font-family);
  line-height: 110%;
  margin-bottom: 20px;
}

.home-intro__description {
  margin-bottom: 25px;
}

@media (max-width: 600px) {
  .home-intro__button {
    height: 45px;
    width: 160px;
  }
}

.home-intro__image {
  min-width: 280px;
}
</style>
