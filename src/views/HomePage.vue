<script setup>
import EventList from "../components/EventList.vue";
</script>

<template>
  <v-container class="intro-container">
    <v-row>
      <v-col>
        <h1 class="title">Encuentra compañeros de basquet</h1>
        <p class="intro-para">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut erat
          felis, molestie sit amet sapien et, aliquet consectetur nunc. Sed ac
          lacinia lacus. Ut imperdiet at nibh et viverra. Duis et justo posuere,
          ornare augue a, euismod metus.
        </p>
        <router-link to="/crear-cuenta"
          ><v-btn class="intro-btn-create-account" color="secondary"
            >Crear cuenta</v-btn
          ></router-link
        >
        <router-link to="/iniciar-sesion"
          ><v-btn class="intro-btn-sign-in">Iniciar sesión</v-btn></router-link
        >
      </v-col>
      <v-col>
        <img
          class="main-image"
          src="../images/MainPicture.jpg"
          alt="foto basquet"
        />
      </v-col>
    </v-row>
  </v-container>

  <v-container class="description-container">
    <h1>Como funciona Canasta Comun</h1>
    <br />
    <v-row cols="12" sm="4">
      <v-col>
        <div class="description-box-1">
          Organiza y juega partidos de basquet
        </div>
      </v-col>
      <v-col>
        <div class="description-box-2">Busca amigos con intereses comunes</div>
      </v-col>
    </v-row>
  </v-container>

  <br />

  <EventList />

  <v-container class="description-container"></v-container>
</template>

<style scoped>
/* intro */
.intro-container {
  margin-bottom: 40px;
}

.title {
  font-size: 4rem;
  font-family: "Young-Serif", serif;
  line-height: 110%;
  margin-bottom: 20px;
}

.intro-para {
  margin-bottom: 25px;
}

.intro-btn-create-account {
  height: 45px;
  border-radius: 50px;
  color: #fff;
  margin-right: 5%;
}

.intro-btn-sign-in {
  height: 45px;
  border-radius: 50px;
  background: #95b37b;
  color: #fff;
}

.main-image {
  height: 500px;
  display: inline-block;
  margin-left: 15%;
}

/* description */
.description-container {
  width: 100%;
  max-width: 100%;
  height: 220px;
  background: rgb(var(--v-theme-primary));
  text-align: center;
  padding-top: 20px;
  color: #fff;
  font-family: "Young-Serif", serif;
}

.description-box-1 {
  border-radius: 25px;
  background: #fff;
  color: black;
  font-size: 3.5vmin;
  margin-left: 40%;
  padding: 5px 10px;
}

.description-box-2 {
  border-radius: 25px;
  background: #fff;
  color: black;
  font-size: 3.5vmin;
  margin-right: 40%;
  padding: 5px 10px;
}

/* events */
.events-container {
  text-align: center;
}
</style>
