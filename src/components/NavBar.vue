<script setup>
import { storeToRefs } from "pinia";
import { useSessionStore } from "../store/session";
import NavbarSearchBox from "./NavbarSearchBox.vue";
import UserAvatar from "./UserAvatar.vue";

const { isLoggedIn, currentUser } = storeToRefs(useSessionStore());
</script>

<template>
  <v-toolbar class="nav-bar" color="primary" absolute>
    <router-link class="nav-bar__logo" to="/">
      <h1>Canastacomun</h1>
    </router-link>

    <v-spacer />

    <div class="d-none d-sm-flex">
      <NavbarSearchBox />

      <router-link :to="{ name: 'CreateEvent' }" v-if="isLoggedIn">
        <i class="font-icon-plus fa-solid fa-plus fa-lg"></i>
      </router-link>

      <router-link :to="{ name: 'ProfilePage', params: { id: currentUser.id } }" v-if="currentUser">
        <UserAvatar :user="currentUser" />
      </router-link>

      <router-link :to="{ name: 'CreateAccount' }" v-if="!isLoggedIn">
        <v-btn class="nav-bar__account">Crear cuenta</v-btn>
      </router-link>

      <router-link :to="{ name: 'SignIn' }" v-if="!isLoggedIn">
        <v-btn class="nav-bar__account">Iniciar sesión</v-btn>
      </router-link>
    </div>

    <div class="d-sm-none">
      <v-menu>
        <template #activator="{ props }">
          <v-icon tag="v-btn" v-bind="props" icon="fa:fas fa-bars"></v-icon>
        </template>

        <v-list>
          <NavbarSearchBox />

          <v-list-item>
            <router-link :to="{ name: 'ProfilePage', params: { id: currentUser.id } }" v-if="currentUser">
              <UserAvatar :user="currentUser" /> Mi perfil
            </router-link>
          </v-list-item>

          <v-list-item>
            <router-link :to="{ name: 'CreateEvent' }" v-if="isLoggedIn"> Organiza un partido </router-link>
          </v-list-item>

          <v-list-item>
            <router-link :to="{ name: 'CreateAccount' }" v-if="!isLoggedIn"> Crear cuenta </router-link>
          </v-list-item>

          <v-list-item>
            <router-link :to="{ name: 'SignIn' }" v-if="!isLoggedIn"> Iniciar sesión </router-link>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-toolbar>
</template>

<style scoped>
.nav-bar {
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

.nav-bar__account {
  margin-top: 4px;
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

@media (max-width: 599px) {
  .nav-bar a {
    margin-right: 0;
  }
  .nav-bar__logo {
    font-size: 90%;
  }
}
</style>
