<script setup>
import Intro from "../components/HomeIntro.vue";
import Description from "../components/HomeDescription.vue";
import EventList from "../components/EventList.vue";
</script>

<template>
  <div class="homepage">
    <Intro />
    <Description />
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
