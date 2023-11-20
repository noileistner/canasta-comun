<script setup>
import { computed } from "vue";
import UserAvatar from "./UserAvatar.vue";

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});

const author = computed(() => props.comment.author);
const createdAt = computed(() => {
  if (!props.comment.createdAt) {
    return;
  }
  return new Date(props.comment.createdAt).toLocaleString();
});
</script>

<template>
  <v-card :title="author?.name" :subtitle="createdAt" class="comment">
    <template #prepend>
      <!-- <v-avatar color="secondary">
        <TwicImg v-if="author.image" :src="author.image.path" />
        <v-icon v-else icon="fa:fas fa-user" />
      </v-avatar> -->

      <router-link :to="{ name: 'ProfilePage', params: { id: author.id } }">
        <UserAvatar :user="author" color="grey" size="40px" />
      </router-link>
    </template>

    <v-card-text>{{ comment.text }}</v-card-text>
  </v-card>
</template>

<style scoped>
.comment {
  width: 80%;
}
</style>
