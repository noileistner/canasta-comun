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
  <v-card class="event-card" width="400" text-align="center">
    <v-img
      v-if="hasImage"
      class="event-card__image"
      cover
      width="100%"
      :src="event.image.url"
    />
    <v-card-title>Organised by {{ event.name }}</v-card-title>
    <v-card-text>{{ event.organizer.name }}</v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="secondary" variant="tonal"> Únete </v-btn>
    </v-card-actions>
  </v-card>
</template>
