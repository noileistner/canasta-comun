<script setup>
import { computed } from "vue";

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

const hasImage = computed(() => props.event?.image?.url);
</script>

<template>
  <v-card class="event-card" max-width="700">
    <TwicImg v-if="hasImage" class="event-card__image" :src="event.image.path" cover />

    <v-card-title class="event-card__title">{{ event.name }}</v-card-title>

    <v-card-text>
      Organizado por
      <router-link class="event-card__organizer" :to="{ name: 'ProfilePage', params: { id: event.organizer.id } }">
        <!-- TODO: add link to user's profile -->
        {{ event.organizer.name }}
      </router-link>
    </v-card-text>

    <v-card-text class="event-card__item event-card__description truncate-text">
      {{ event.description }}
    </v-card-text>

    <v-card-text class="event-card__item">
      <v-icon class="fa-solid fa-calendar-days" color="secondary" />
      {{ event.date }}</v-card-text
    >

    <v-card-text class="event-card__item">
      <v-icon class="fa-solid fa-clock" color="secondary" />
      {{ event.time }}
    </v-card-text>

    <v-card-text class="event-card__item">
      <v-icon class="fa-solid fa-location-dot" color="secondary" />
      {{ event.location }}</v-card-text
    >

    <v-card-actions>
      <v-spacer />
      <v-btn color="secondary" variant="tonal"> Únete </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.event-card {
  text-align: left;
  width: 80%;
}
.event-card__image {
  aspect-ratio: 5/3;
}
.event-card__title {
  font-family: var(--app-font-family);
  padding-top: 15px;
  font-size: 4.6vh;
}
.event-card__organizer {
  color: #48a67c;
}
.event-card__description {
  font-size: 2vh;
  margin-bottom: 10px;
}
.truncate-text {
  /* position: relative; */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  /* max-height: calc(1.5em * 3); */
}
/* .truncate-text::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 1.5em;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)); */
/* } */
.event-card__item {
  padding: 5px;
  padding-left: 16px;
}

@media (max-width: 340px) {
  .event-card {
    width: 65%;
  }
}
</style>
