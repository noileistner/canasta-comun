<script setup>
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
  <v-container class="profile">
    <v-row>
      <v-col class="profile__row-1">
        <h1>Nói Leistner</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis laborum assumenda voluptate molestiae libero
          nam rem perferendis magnam nihil eius voluptates beatae, odio doloremque et dolorum repellendus harum fugiat
          tenetur?
        </p>
        <p class="profile__age"><i class="fa-solid fa-cake-candles"></i> 17</p>
        <p class="profile__location"><i class="fa-solid fa-location-dot"></i> Sitges, España</p>
        <v-btn class="profile__sign-out-btn" rounded color="secondary" @click="handleSignOut">Cerrar sesión</v-btn>
      </v-col>

      <v-col>
        <img
          src="https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/A-Alamy-BXWK5E_vvmkuf.jpg"
          alt="Foto de Perfil"
          class="profile__photo"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.profile {
  display: grid;
  justify-content: center;
  padding-bottom: 262px;
  width: 70%;
}
.profile__row-1 {
  padding-left: 30px;
}
.profile__age {
  padding-top: 15px;
  font-size: 110%;
}
.profile__location {
  margin-top: 10px;
  font-size: 110%;
}
.profile__sign-out-btn {
  margin-top: 20px;
}
.profile__photo {
  margin-left: 10%;
  border-radius: 50%;
  width: 300px;
  height: 300px;
  object-fit: cover;
}

@media (max-width: 615px) {
  .profile__photo {
  }
}
</style>
