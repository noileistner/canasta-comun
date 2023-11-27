<template>
  <v-row class="p404">
    <v-col cols="7">
      <v-card class="text-center" height="500px" variant="flat">
        <v-card-title class="p404__title">404</v-card-title>
        <v-card-subtitle class="p404__subtitle"> Página no encontrada </v-card-subtitle>
        <v-btn rounded color="secondary" size="large">
          <router-link to="/">
            <p class="go-back">Volver atrás</p>
          </router-link>
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.p404 {
  display: flex;
  justify-content: center;
  margin-bottom: 72px;
}
.p404__title {
  padding-top: 100px;
  padding-bottom: 70px;
  font-size: 700%;
  opacity: 0.5;
}
.p404__subtitle {
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 30px;
  font-size: 230%;
  font-family: var(--app-font-family);
}
.go-back {
  color: #fff;
}
</style>
