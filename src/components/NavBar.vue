<template>
  <v-toolbar class="nav-bar" color="primary" absolute>
    <router-link class="nav-bar__logo" to="/">
      <h1>CanastaComun</h1>
    </router-link>

    <v-spacer />

    <div class="d-none d-sm-flex">
      <NavbarSearchBox />

      <router-link to="/crear-partido">
        <i class="font-icon-plus fa-solid fa-plus fa-lg"></i>
      </router-link>
      <router-link to="/perfil" v-if="!isLoggedIn">
        <i class="font-icon-user fa-solid fa-user"></i>
      </router-link>
    </div>

    <v-app-bar-nav-icon class="d-sm-none">
      <i class="fa-solid fa-bars"></i>
    </v-app-bar-nav-icon>
  </v-toolbar>
</template>

<script setup>
import NavbarSearchBox from "./NavbarSearchBox.vue";
</script>

<style scoped>
.nav-bar {
  /* position: fixed; */
  top: 0;
  left: 0;
  right: 0;
  margin-top: 0;
  padding: 15px;
  color: white;
  display: flex;
  align-items: center;
  border-bottom: 7px solid rgb(var(--v-theme-secondary));
  z-index: 2;
}

.nav-bar__logo {
  opacity: 1 !important;
  font-family: var(--app-font-family);
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

.nav-bar a {
  display: inline-block;
  margin-right: 40px;
  color: white;
  opacity: 0.7;
}
.nav-bar a.router-link-active,
.nav-bar a:hover {
  opacity: 1;
}
</style>
