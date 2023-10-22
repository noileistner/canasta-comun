<script setup>
import { useEventsStore } from "../store/events";
import EventCard from "./EventCard.vue";

const { events } = useEventsStore();
</script>

<template>
  <div class="event-list">
    <h1>Eventos próximos</h1>
    <div class="event-list__container">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<style scoped>
.event-list {
  text-align: center;
}
.event-list__container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
</style>
