<script setup>
import { computed, ref } from "vue";
import EventParticipant from "./EventParticipant.vue";

const props = defineProps({
  participants: {
    type: Array,
  },
});

const DEFAULT_PARTICIPANTS_LIST_SIZE = 5;

const participants = computed(() => {
  const participants = props.participants ?? [];

  if (showAll.value) {
    return participants;
  }
  return participants.slice(0, DEFAULT_PARTICIPANTS_LIST_SIZE);
});

const count = computed(() => props.participants?.length ?? 0);
const hasParticipants = computed(() => count.value > 0);

const showAll = ref(false);

const showToggleShowAllButton = computed(() => props.comments?.length > DEFAULT_PARTICIPANTS_LIST_SIZE);
const toggleShowAllButtonLabel = computed(() => {
  return `Enseña ${showAll.value ? "menos" : "todo"}`;
});

function toggleShowAll() {
  showAll.value = !showAll.value;
}
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
      <v-btn v-if="showToggleShowAllButton" @click="toggleShowAll" variant="text">{{ toggleShowAllButtonLabel }}</v-btn>
    </div>
  </v-container>
</template>

<style scoped>
.participants .participant:not(:last-child) {
  margin-bottom: 20px;
}

.participants {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}
</style>
