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

        <v-card-text class="profile__details profile__all">
          <v-icon class="fa-solid fa-cake-candles" color="secondary" />
          <span v-if="user.birthday" class="profile__icon-text">{{ user.birthday }}</span>
        </v-card-text>

        <v-card-text class="profile__details profile__all">
          <v-icon class="fa-solid fa-location-dot" color="secondary" />
          <span v-if="user.location" class="profile__icon-text">{{ user.location }}</span>
        </v-card-text>
      </v-card>

      <template #image>
        <v-card variant="flat" min-width="250" max-width="300">
          <TwicImg v-if="user.image" class="profile__photo" alt="Foto de Perfil" :src="user.image.path" width="300" />
          <v-img
            v-else
            class="profile__photo"
            width="300"
            src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
          />
        </v-card>
      </template>

      <template #buttons>
        <router-link to="/perfil-editar">
          <v-btn class="profile__btn" rounded color="secondary">Editar perfil</v-btn>
        </router-link>

        <v-btn class="profile__btn" rounded color="tertiary" @click="handleSignOut">Cerrar sesión</v-btn>
      </template>
    </ContentContainer>

    <v-container v-else class="profile__loading">
      <v-progress-circular indeterminate />
    </v-container>
  </v-fade-transition>
</template>

<style scoped>
.profile {
  margin-bottom: 83px;
}
.profile__user-name {
  font-family: var(--app-font-family);
  font-size: 3vw;
  font-weight: 700;
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

@media (max-width: 310px) {
  .profile__photo {
    width: 50%;
  }
}
</style>
