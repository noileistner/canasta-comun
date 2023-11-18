<script setup>
import ContentContainer from "@/components/ContentContainer.vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

import { useUserStore } from "@/store/user";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const { find: findUser } = useUserStore();
const router = useRouter();
const route = useRoute();
const id = computed(() => route.params.id);
const user = ref(null);

async function loadUser() {
  if (id.value) {
    user.value = await findUser(id.value);
  }
}

onMounted(async () => {
  loadUser();
});

// sign out

function handleSignOut() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("success");
      router.push("/");
    })
    .catch((error) => {
      console.log("error", error);
    });
}
</script>

<template>
  <v-fade-transition>
    <ContentContainer v-if="user" class="profile">
      <v-card variant="flat" min-width="300">
        <v-card-title class="profile__user-name">{{ user.name }}</v-card-title>

        <v-card-text class="profile__description">
          {{ user.description }}
        </v-card-text>

        <v-card-text class="profile__details profile__all" v-if="user.birthday">
          <v-icon class="fa-solid fa-cake-candles" color="secondary" />
          <span class="profile__icon-text">{{ user.birthday }}</span>
        </v-card-text>

        <v-card-text class="profile__details profile__all" v-if="user.location">
          <v-icon class="fa-solid fa-location-dot" color="secondary" />
          <span class="profile__icon-text">{{ user.location }}</span>
        </v-card-text>
      </v-card>

      <template #image>
        <v-card variant="flat" min-width="180">
          <TwicImg v-if="user.image" class="profile__photo" alt="Foto de Perfil" :src="user.image.path" width="300" />
          <div v-else>this is da placeholder</div>
        </v-card>
      </template>
    </ContentContainer>

    <v-container v-else class="profile__loading">
      <v-progress-circular indeterminate />
    </v-container>
  </v-fade-transition>

  <div class="profile__buttons">
    <router-link to="/perfil-editar">
      <v-btn class="profile__btn" rounded color="secondary">Editar perfil</v-btn>
    </router-link>

    <v-btn class="profile__btn" rounded color="tertiary" @click="handleSignOut">Cerrar sesión</v-btn>
  </div>
</template>

<style scoped>
.profile {
  /* margin-bottom: 195px; */
}
.profile__user-name {
  font-family: var(--app-font-family);
  font-size: 6vh;
  padding-top: 8px;
  padding-bottom: 20px;
}
.profile__all {
  padding-bottom: 3%;
  padding-top: 0;
}
.profile__details {
  font-size: 2vh;
  opacity: 0.8;
}
.profile__description {
  font-size: 1.8vh;
}
.profile__icon-text {
  padding-left: 5px;
}
.profile__btn {
  margin-top: 20px;
  /* margin-left: 15px; */
  margin-bottom: 20px;
}
.profile__photo {
  border-radius: 50%;
}
.profile__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}
.profile__buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 37px;
}

@media (max-width: 310px) {
  .profile__photo {
    width: 50%;
  }
}
</style>
