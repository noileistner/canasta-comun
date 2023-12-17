<script setup>
import { useDate } from "@/composables/useDate";
import { useEventsStore } from "@/store/events";
import { useFollowingStore } from "@/store/following";
import { useSessionStore } from "@/store/session";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { watch } from "vue";
import EventCard from "./EventCard.vue";

const { events } = storeToRefs(useEventsStore());
const { loadAll } = useEventsStore();
const router = useRouter();

const { today } = useDate();

const props = defineProps({
  organizer: Object,
  maxWidth: [String, Number],
});

const allFollowing = ref(null);
const { all: findAllFollowing } = useFollowingStore();

const { currentUser } = storeToRefs(useSessionStore());
watch(
  () => currentUser.value,
  () => fetchAllFollowing(),
);

async function fetchAllFollowing() {
  if (currentUser.value) {
    allFollowing.value = await findAllFollowing(currentUser.value?.id);
  } else {
    allFollowing.value = null;
  }
}

const filters = {
  all: "all",
  following: "following",
  upcoming: "upcoming",
};

const sourceFilter = ref(filters.all);
const timeFilter = ref(filters.upcoming);

const filteredEvents = computed(() => {
  const minDate = today();
  const relevantEvents = events.value?.filter(({ date }) => {
    if (timeFilter.value === filters.upcoming) {
      return date >= minDate;
    }
    return true;
  });

  if (props.organizer) {
    return relevantEvents?.filter((event) => event.organizer?.id === props.organizer.id);
  }

  if (sourceFilter.value === filters.following) {
    const ids = allFollowing.value?.map(({ id }) => id) ?? [];
    return relevantEvents?.filter((event) => ids.includes(event.organizer?.id));
  }

  return relevantEvents;
});

function navigateToDetail(eventId) {
  router.push({ name: "EventDetails", params: { id: eventId } });
}

const showSourceFilter = computed(() => {
  return !props.organizer && allFollowing.value?.length > 0;
});

onMounted(() => {
  loadAll();
  fetchAllFollowing();
});
</script>

<template>
  <div class="event-list">
    <v-btn-toggle v-if="showSourceFilter" mandatory color="secondary" v-model="sourceFilter">
      <v-btn :value="filters.all">de todos</v-btn>
      <v-btn :value="filters.following">de amigos</v-btn>
    </v-btn-toggle>

    <br />
    <br />

    <v-btn-toggle mandatory color="secondary" v-model="timeFilter">
      <v-btn :value="filters.upcoming">próximos</v-btn>
      <v-btn :value="filters.all">todos</v-btn>
    </v-btn-toggle>

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
