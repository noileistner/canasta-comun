<script setup>
import { computed } from "vue";

const props = defineProps({
  participant: {
    type: Object,
    required: true,
  },
});

const joinedAt = computed(() => {
  if (!props.participant.createdAt) {
    return;
  }
  return new Date(props.participant.createdAt).toLocaleString();
});
</script>

<template>
  <v-card :title="participant.name" :subtitle="joinedAt">
    <template #prepend>
      <v-avatar color="secondary">
        <TwicImg v-if="participant.image" :src="participant.image.path" />
        <v-icon v-else icon="fa:fas fa-user-astronaut" />
      </v-avatar>
    </template>
  </v-card>
</template>
