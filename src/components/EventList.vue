<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useEventsStore } from "../store/events";
import EventCard from "./EventCard.vue";

const { events } = storeToRefs(useEventsStore());
const { loadAll } = useEventsStore();
const router = useRouter();

const props = defineProps({
  organizer: Object,
  maxWidth: [String, Number],
});

const filteredEvents = computed(() => {
  if (props.organizer) {
    return events.value?.filter((event) => event.organizer?.id === props.organizer.id);
  }
  return events.value;
});

function navigateToDetail(eventId) {
  router.push({ name: "EventDetails", params: { id: eventId } });
}

onMounted(() => loadAll());
</script>

<template>
  <div class="event-list">
    <div class="event-list__container">
      <EventCard
        v-for="event in filteredEvents"
        :max-width="maxWidth"
        :key="event.id"
        :event="event"
        @click="navigateToDetail(event.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.event-list {
  text-align: center;
}

.event-list__container {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  padding: 40px 3% 60px 3%;
}
@media (max-width: 400px) {
  .event-list__container {
    justify-items: left;
    margin-left: 5%;
  }
}
@media (max-width: 361px) {
  .event-list__container {
    justify-items: left;
    margin-left: 2.5%;
  }
}
@media (max-width: 280px) {
  .event-list__container {
    justify-items: left;
    margin-left: 0;
  }
}
</style>
