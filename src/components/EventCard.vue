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
  <v-card class="event-card">
    <TwicImg v-if="hasImage" class="event-card__image" :src="event.image.path" />
    <v-card-title>{{ event.name }}</v-card-title>

    <v-card-text>
      Organizado por
      <router-link class="event-card__organizer" :to="{ name: 'ProfilePage', params: { id: event.organizer.id } }">
        <!-- TODO: add link to user's profile -->
        {{ event.organizer.name }}
      </router-link>
    </v-card-text>

    <v-card-text class="event-card__item">{{ event.date }}</v-card-text>

    <v-card-text class="event-card__item">{{ event.location }}</v-card-text>

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
.event-card__organizer {
  color: #48a67c;
}

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
