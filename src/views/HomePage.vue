<script setup>
import Intro from "../components/HomeIntro.vue";
import Description from "../components/HomeDescription.vue";
import EventList from "../components/EventList.vue";
import { useSessionStore } from "../store/session";
import { storeToRefs } from "pinia";

const { isLoggedIn } = storeToRefs(useSessionStore());
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
