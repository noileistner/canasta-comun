<template>
  <v-toolbar class="nav" color="primary">
    <router-link id="logo" to="/"><h1>CanastaComun</h1></router-link>
    <v-spacer></v-spacer>
    <div class="d-none d-sm-flex">
      <div id="searchbar">
        <v-responsive class="ma-0 pa-0" width="150px">
          <v-text-field
            v-model="searchInput"
            flat
            density="compact"
            variant="solo"
            hide-details
            single-line
            rounded
            placeholder="buscar"
            append-inner-icon="mdi-magnify"
            @keydown.enter="onSearchKeyDown"
            @click:append-inner="onSearchClick"
          />
        </v-responsive>
      </div>
      <router-link to="/crear-partido"
        ><i class="font-icon-plus fa-solid fa-plus fa-lg"></i
      ></router-link>
      <router-link to="/">
        <i class="font-icon-user fa-solid fa-user"></i>
      </router-link>
      <router-link to="/sobre">
        <i class="font-icon-history fa-solid fa-landmark"></i>
      </router-link>
    </div>
    <v-app-bar-nav-icon class="d-sm-none"
      ><i class="fa-solid fa-bars"></i
    ></v-app-bar-nav-icon>
  </v-toolbar>
</template>

<script setup>
import { ref } from "vue";

const searchInput = ref("");

function onSearchKeyDown() {
  search();
}

function onSearchClick() {
  search();
}

function search() {
  console.log(searchInput.value);
}
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin-top: 0;
  padding: 15px;
  /* background: var(--color-main); */
  color: white;
  display: flex;
  align-items: center;
  border-bottom: 7px solid rgb(var(--v-theme-secondary));
  z-index: 2;
}

#logo {
  opacity: 1 !important;
  font-family: "Young-Serif", serif;
}

.font-icon-history {
  padding-top: 15px;
}

.font-icon-plus {
  padding-top: 21px;
}

.font-icon-user {
  padding-top: 15px;
}

#searchbar {
  margin-right: 30px;
}

.nav a {
  display: inline-block;
  margin-right: 40px;
  color: white;
  opacity: 0.7;
}
.nav a.router-link-active,
.nav a:hover {
  opacity: 1;
}
</style>
