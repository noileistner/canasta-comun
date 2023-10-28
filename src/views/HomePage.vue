<script setup>
import Intro from "../components/HomeIntro.vue";
import Description from "../components/HomeDescription.vue";
import EventList from "../components/EventList.vue";

import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const isLoggedIn = ref(false);
let auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});
</script>

<template>
  <div class="homepage">
    <Intro v-if="!isLoggedIn" />
    <Description v-if="!isLoggedIn" />
    <EventList />
  </div>
</template>

<style scoped>
.homepage {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
