<script setup>
import UserAvatar from "./UserAvatar.vue";

const props = defineProps({
  participant: {
    type: Object,
    required: true,
  },
});

// const joinedAt = computed(() => {
//   if (!props.participant.createdAt) {
//     return;
//   }
//   return new Date(props.participant.createdAt).toLocaleString();
// });
</script>

<template>
  <router-link :to="{ name: 'ProfilePage', params: { id: participant.id } }">
    <v-card class="event-participant text-center">
      <UserAvatar :user="participant" color="grey" size="80px" />

      <v-card-title>
        {{ participant.name }}
      </v-card-title>
    </v-card>
  </router-link>
</template>

<style scoped>
.event-participant {
  width: 200px;
  margin-top: 20px;
  padding-top: 12px;
}
.event-participant__avatar {
  margin-top: 12px;
}
</style>
