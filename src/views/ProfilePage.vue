<script setup>
import ContentContainer from "@/components/ContentContainer.vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();

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
  <ContentContainer class="profile">
    <v-card min-width="350" variant="flat">
      <v-card-title class="profile__user-name">Nói Leistner</v-card-title>
      <v-card-text>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis laborum assumenda voluptate molestiae libero nam
        rem perferendis magnam nihil eius voluptates beatae, odio doloremque et dolorum repellendus harum fugiat
        tenetur?
      </v-card-text>
      <v-card-text class="profile__details profile__all"
        ><v-icon class="fa-solid fa-cake-candles" color="secondary" /> 17</v-card-text
      >
      <v-card-text class="profile__details profile__all"
        ><v-icon class="fa-solid fa-location-dot" color="secondary" /> Sitges, España</v-card-text
      >
      <v-btn class="profile__sign-out-btn" rounded color="secondary" @click="handleSignOut">Cerrar sesión</v-btn>
    </v-card>

    <template #image>
      <v-card variant="flat" min-width="350">
        <v-img
          src="https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/A-Alamy-BXWK5E_vvmkuf.jpg"
          alt="Foto de Perfil"
          class="profile__photo"
          width="350"
          height="350"
          cover
        />
        <!-- <TwicImg
          class="profile__photo"
          src="o/event-images%2FIMG_7999.jpg?alt=media&token=540b00bf-ade8-4016-a290-04e146d27961"
          width="350px"
          height="350px"
        /> -->
      </v-card>
    </template>
  </ContentContainer>
</template>

<style scoped>
.profile__user-name {
  font-family: var(--app-font-family);
  font-size: 3.5vw;
  padding-top: 8px;
  padding-bottom: 20px;
}
.profile__all {
  padding-bottom: 20px;
  padding-top: 0;
}
.profile__details {
  font-size: 1.4vw;
  opacity: 0.8;
}
.profile__sign-out-btn {
  margin-top: 20px;
  margin-left: 15px;
}
.profile__photo {
  border-radius: 50%;
}
</style>
