<template>
  <v-container class="home-intro">
    <v-row>
      <v-col>
        <h1 class="home-intro__title">Encuentra compañeros de basquet</h1>

        <p class="home-intro__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut erat
          felis, molestie sit amet sapien et, aliquet consectetur nunc. Sed ac
          lacinia lacus. Ut imperdiet at nibh et viverra. Duis et justo posuere,
          ornare augue a, euismod metus.
        </p>

        <router-link to="/crear-cuenta">
          <v-btn rounded color="secondary" size="large">Crear cuenta</v-btn>
        </router-link>
        <router-link to="/iniciar-sesion">
          <v-btn rounded color="tertiary" size="large">Iniciar sesión</v-btn>
        </router-link>
      </v-col>

      <v-col>
        <v-img
          src="../images/MainPicture.jpg"
          alt="foto basquet"
          height="500"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.home-intro__title {
  font-size: 4rem;
  font-family: var(--app-font-family);
  line-height: 110%;
  margin-bottom: 20px;
}

.home-intro__description {
  margin-bottom: 25px;
}
</style>
