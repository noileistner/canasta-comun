<script setup>
import { storeToRefs } from "pinia";
import EventList from "../components/EventList.vue";
import Description from "../components/HomeDescription.vue";
import Intro from "../components/HomeIntro.vue";
import { useSessionStore } from "../store/session";

const { isLoggedIn } = storeToRefs(useSessionStore());
</script>

<template>
  <div class="homepage">
    <Intro v-if="!isLoggedIn" />
    <Description v-if="!isLoggedIn" />
    <h1 class="event-list__title">Descubre partidos</h1>
    <EventList />
  </div>
</template>

<style scoped>
.homepage {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.event-list__title {
  /* font-size: 160%; */
  font-family: var(--app-font-family);
  display: flex;
  justify-content: center;
}
</style>
