<script setup>
import { computed } from "vue";
import EventParticipant from "./EventParticipant.vue";

const props = defineProps({
  participants: {
    type: Array,
  },
});

const participants = computed(() => props.participants ?? []);

const count = computed(() => props.participants?.length ?? 0);
const hasParticipants = computed(() => count.value > 0);
</script>

<template>
  <v-container>
    <h3>Participantes ({{ count }})</h3>
    <div v-if="hasParticipants" class="participants">
      <EventParticipant
        class="participant"
        v-for="participant in participants"
        :key="participant.id"
        :participant="participant"
      />
    </div>
  </v-container>
</template>

<style scoped>
.participants .participant:not(:last-child) {
  margin-bottom: 20px;
}
</style>
